import { Options } from "@ratcat/core";


/**
 * Configuration options for the RatCat Node SDK.
 * @see NodeClient for more information.
 */
export interface NodeOptions extends Options {
	/** Sets an optional server name (device name) */
	serverName?: string;

	/** Set a HTTP proxy that should be used for outbound requests. */
	httpProxy?: string;

	/** Set a HTTPS proxy that should be used for outbound requests. */
	httpsProxy?: string;

	/** HTTPS proxy certificates path */
	caCerts?: string;
	frameContextLines?: number;

	/** Callback that is executed when a fatal global error occurs. */
	onFatalError?(error: Error): void;
}
