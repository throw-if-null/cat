/** Base configuration options for every SDK. */
import { Transport, TransportClass, TransportOptions } from "./transport";
import { LogLevel } from "./logger";
import { SDKMetaData } from "./sdk-meta";

export interface Options {
	/**
	 * Enable debug functionality in the SDK itself
	 */
	debug?: boolean;

	/**
	 * Specifies whether this SDK should send events to Sentry.
	 * Defaults to true.
	 */
	enabled?: boolean;

	/**
	 * The CSN used to connect to Rat and identify the project.
	 */
	csn: string;

	/**
	 * Transport object that should be used to send events to Sentry
	 */
	transport?: TransportClass<Transport>;

	/**
	 * Options for the default transport that the SDK uses.
	 */
	transportOptions?: TransportOptions;

	/** The current environment of your application (e.g. "production"). */
	environment?: string;

	/** Console logging verbosity for the SDK Client. */
	logLevel?: LogLevel;

	/**
	 * Set of metadata about the SDK that can be internally used to enhance envelopes and events,
	 * and provide additional data about every request.
	 * */
	metadata?: SDKMetaData;

	/**
	 * Send SDK Client Reports.
	 * By default, Client Reports are enabled.
	 */
	sendClientReports?: boolean;
}
