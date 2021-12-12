export interface Logger {
	error(message: any, trace?: string, context?: string): void;

	debug(message: any, context?: string): void;

	verbose(message: any, context?: string): void;
}

export enum LogLevel {
	/** All SDK actions will be logged. */
	VERBOSE,
	/** Information useful for debugging the SDK will be logged. */
	DEBUG,
	/** Only SDK internal errors will be logged. */
	ERROR,
	/** No logs will be generated. */
	NONE
}
