// CSN - Configuration Source Name

/** Supported Rat transport protocols in a CSN. */
export type CsnProtocol = 'http' | 'https';

/** Primitive components of a Dsn. */
export interface CsnComponents {
	/** Protocol used to connect to Rat. */
	protocol: CsnProtocol;
	/** Public authorization key. */
	publicKey?: string;
	/** Hostname of the Rat instance. */
	host: string;
	/** Port of the Rat instance. */
	port?: string;
	/** Sub path/ */
	path?: string;
	/** Configuration ID */
	configurationId: string;
}

/** Anything that can be parsed into a Dsn. */
export type CsnLike = string | CsnComponents;

/** The Rat Csn, identifying a Rat instance and project. */
export interface Csn extends CsnComponents {
	/**
	 * Renders the string representation of this Csn.
	 */
	toString(): string;
}
