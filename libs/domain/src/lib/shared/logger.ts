export enum LogLevel {
	DEBUG,
	VERBOSE,
	LOG,
	WARN,
	ERROR
}

export type ConsoleLevel = keyof Pick<Console, "error" | "warn" | "log" | "debug" | "info" | "groupCollapsed">;


export interface ILogger {
	debug(message: any, context?: string): void;

	verbose(message: any, context?: string): void;

	log(message: any, context?: string): void;

	warn(message: any, context?: string): void;

	error(message: any, trace?: string, context?: string): void;

	group(message: any, context?: string): void;

	groupEnd(): void;
}
