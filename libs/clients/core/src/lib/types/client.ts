import { Options } from "./options";
import { Configuration } from "./configuration";
import { Csn } from "./csn";
import { Transport } from "./transport";

/**
 * User-Facing Sentry SDK Client.
 *
 * This interface contains all methods to interface with the SDK once it has
 * been installed. It allows to fetch configurations from Rat and update entries.
 *
 */
export interface Client<O extends Options = Options> {
	/**
	 * Fetch a configuration.
	 *
	 * @param id The configuration ID
	 * @returns The configuration
	 */
	getConfiguration(id: string): Promise<Configuration>;

	/**
	 * Captures a message event and sends it to Sentry.
	 *
	 * @param id The configuration ID
	 * @param data The configurations data
	 * @returns The request promise
	 */
	updateConfiguration(id: string, data: any): Promise<void>;

	/** Returns the current CSN. */
	getCsn(): Csn | undefined;

	/** Returns the current options. */
	getOptions(): O;

	/** Returns clients transport. */
	getTransport?(): Transport;
}
