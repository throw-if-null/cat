/** Transport used sending data to Rat */
import { Csn } from "./csn";
import { Configuration } from "./configuration";
import { SDKMetaData } from "./sdk-meta";

export interface Transport {

	/**
	 * Fetch the config by ID from the Configuration endpoint in Rat.
	 *
	 * @param configurationId string that should be fetched from Rat.
	 */
	getConfiguration(configurationId: string): Promise<Configuration>;

	/**
	 * Sends the config to the Configuration endpoint in Rat.
	 *
	 * @param configurationId Configuration ID that should be updated in Rat.
	 */
	updateConfiguration(configurationId: string, data: any): Promise<void>;

}

/** JSDoc */
export type TransportClass<T extends Transport> = new (options: TransportOptions) => T;

/** JSDoc */
export interface TransportOptions {
	/** RAT CSN */
	csn: Csn;
	/** Define custom headers */
	headers?: { [key: string]: string };
	/** Set an HTTP proxy that should be used for outbound requests. */
	httpProxy?: string;
	/** Set an HTTPS proxy that should be used for outbound requests. */
	httpsProxy?: string;
	/** HTTPS proxy certificates path */
	caCerts?: string;
	/**
	 * Set of metadata about the SDK that can be internally used
	 */
	metadata?: SDKMetaData;
}
