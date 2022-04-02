/**
 * Internal platform-dependent Sentry SDK Backend.
 *
 * While {@link Client} contains business logic specific to an SDK, the
 * Backend offers platform specific implementations for low-level operations.
 * These are persisting and loading information, interacting with configurations, and hooking
 * into the environment.
 *
 * Backends receive a handle to the Client in their constructor. When a
 * Backend automatically updates a configuration, it must pass them to
 * the Client for validation and processing first.
 *
 * Usually, the Client will be of corresponding type, e.g. NodeBackend
 * receives NodeClient. However, higher-level SDKs can choose to instantiate
 * multiple Backends and delegate tasks between them. In this case, an event
 * generated by one backend might very well be sent by another one.
 *
 * The client also provides access to options via {@link Client.getOptions}.
 * @hidden
 */
import { Configuration, Options, Transport } from "@cat/domain/client";
import { Logger } from "@cat/shared/logger";
import { parseConfigEntries } from "@cat/shared/utils";

export interface Backend {

	getConfiguration(id: string): Promise<object>;

	updateConfiguration(id: string, data: any): Promise<void>;

	/**
	 * Returns the transport that is used by the backend.
	 * Please note that the transport gets lazy initialized, so it will only be there once the first event has been sent.
	 *
	 * @returns The transport.
	 */
	getTransport(): Transport;
}

/**
 * A class object that can instantiate Backend objects.
 * @hidden
 */
export type BackendClass<B extends Backend, O extends Options> = new (options: O) => B;

/**
 * This is the base implementation of a Backend.
 * @hidden
 */
export abstract class BaseBackend<O extends Options> implements Backend {
	protected readonly options: O;

	/** Cached transport used internally. */
	protected transport: Transport;

	private logger = new Logger('BaseBackend');

	constructor(options: O) {
		this.options = options;
		if (!this.options.csn) {
			this.logger.error('No CSN provided, backend will not do anything.');
		}
		this.transport = this._setupTransport();
		this.logger.log(this.transport);
	}


	/**
	 * @inheritDoc
	 */
	public getConfiguration(configurationId: string): Promise<object> {
		return new Promise((resolve, reject) => {
			this.transport.getConfiguration(configurationId)
				.then(
					configuration => resolve(parseConfigEntries(configuration.entries)),
					error => {
						this.logger.error(`Error while fetching configuration: ${ error }`);
						reject(error);
					});
		});
	}

	/**
	 * @inheritDoc
	 */
	public updateConfiguration(configurationId: string, data: any): Promise<void> {
		return this.transport.updateConfiguration(configurationId, data).then(null, reason => {
			this.logger.error(`Error while updating configuration: ${ reason }`);
		});
	}

	/**
	 * @inheritDoc
	 */
	public getTransport(): Transport {
		return this.transport;
	}

	/**
	 * Sets up the transport, so it can be used later to send requests.
	 */
	protected _setupTransport(): Transport {
		return new NoopTransport();
	}
}

/** Noop transport */
export class NoopTransport implements Transport {
	/**
	 * @inheritDoc
	 */
	getConfiguration(_: string): Promise<Configuration> {
		return Promise.reject(`NoopTransport: getConfiguration has been skipped because no Csn is configured.`);
	}

	/**
	 * @inheritDoc
	 */
	updateConfiguration(id: string, data: any): Promise<void> {
		return Promise.reject(`NoopTransport: updateConfiguration has been skipped because no Csn is configured.`);
	}
}
