/** Base configuration options for every SDK. */
// import { LogLevel } from "@cat/shared/logger";
import { SDKMetaData } from "./sdk-meta";
import { Transport, TransportClass, TransportOptions } from "./transport";

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
	logLevel?: any;

	/**
	 * Set of metadata about the SDK that can be internally used to enhance envelopes and events,
	 * and provide additional data about every request.
	 * */
	metadata?: SDKMetaData;

	/**
	 * Send SDK Client Reports.
	 * By default, Client Reports are disabled.
	 */
	sendClientReports?: boolean;
}
