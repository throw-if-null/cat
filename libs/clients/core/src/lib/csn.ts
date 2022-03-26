/** The Sentry Dsn, identifying a Sentry instance and project. */
import { RatCatError } from "../../../../shared/error/src/lib/errors";
import { Csn, CsnComponents, CsnLike, CsnProtocol } from "./types/csn";


/** Regular expression used to parse a Dsn. */
const CSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
/** Error message */
const ERROR_MESSAGE = 'Invalid CSN';

export class CSN implements Csn {
	/** Protocol used to connect to Sentry. */
	public protocol!: CsnProtocol;
	/** Public authorization key. */
	public publicKey!: string;
	/** Hostname of the Rat instance. */
	public host!: string;
	/** Port of the Rat instance. */
	public port!: string;
	/** Path */
	public path!: string;
	/** Project ID */
	public configurationId!: string;

	/** Creates a new CSN component */
	public constructor(from: CsnLike) {
		if (typeof from === 'string') {
			this._fromString(from);
		} else {
			this._fromComponents(from);
		}

		this._validate();
	}

	/**
	 * Renders the string representation of this Csn.
	 */
	public toString(): string {
		const { host, path, port, configurationId, protocol, publicKey } = this;
		return (
			`${ protocol }://${ publicKey }` +
			`@${ host }${ port ? `:${ port }` : '' }/${ path ? `${ path }/` : path }${ configurationId }`
		);
	}

	/** Parses a string into this Dsn. */
	private _fromString(str: string): void {
		const match = CSN_REGEX.exec(str);

		if (!match) {
			throw new RatCatError(ERROR_MESSAGE);
		}

		const [ protocol, publicKey, pass = '', host, port = '', lastPath ] = match.slice(1);
		let path = '';
		let configurationId = lastPath;

		const split = configurationId.split('/');
		if (split.length > 1) {
			path = split.slice(0, -1).join('/');
			configurationId = split.pop() as string;
		}

		if (configurationId) {
			const projectMatch = configurationId.match(/^\d+/);
			if (projectMatch) {
				configurationId = projectMatch[0];
			}
		}

		this._fromComponents({ host, path, configurationId, port, protocol: protocol as CsnProtocol, publicKey });
	}

	/** Maps Csn components into this instance. */
	private _fromComponents(components: CsnComponents): void {
		this.protocol = components.protocol;
		this.publicKey = components.publicKey || '';
		this.host = components.host;
		this.port = components.port || '';
		this.path = components.path || '';
		this.configurationId = components.configurationId;
	}

	/** Validates this Csn and throws on error. */
	private _validate(): void {
		[ 'protocol', 'publicKey', 'host', 'configurationId' ].forEach(component => {
			if (!this[component as keyof CsnComponents]) {
				throw new RatCatError(`${ ERROR_MESSAGE }: ${ component } missing`);
			}
		});

		if (!this.configurationId.match(/^\d+$/)) {
			throw new RatCatError(`${ ERROR_MESSAGE }: Invalid configurationId ${ this.configurationId }`);
		}

		if (this.protocol !== 'http' && this.protocol !== 'https') {
			throw new RatCatError(`${ ERROR_MESSAGE }: Invalid protocol ${ this.protocol }`);
		}

		if (this.port && isNaN(parseInt(this.port, 10))) {
			throw new RatCatError(`${ ERROR_MESSAGE }: Invalid port ${ this.port }`);
		}
	}
}
