import { blue, cyanBright, red, yellow } from "./console-color";

export enum LogLevel {
	DEBUG,
	VERBOSE,
	LOG,
	WARN,
	ERROR
}

type ConsoleLevel = keyof Pick<Console, "error" | "warn" | "log" | "debug" | "info" | "groupCollapsed">;

export interface ILogger {
	debug(message: any, context?: string): void;

	verbose(message: any, context?: string): void;

	log(message: any, context?: string): void;

	warn(message: any, context?: string): void;

	error(message: any, trace?: string, context?: string): void;

	group(message: any, context?: string): void;

	groupEnd(): void;
}

/**
 * Logging utility class
 * inspiration gathered from Nest.js Logging https://docs.nestjs.com/techniques/logger
 */
export class Logger implements ILogger {
	protected static instance?: typeof Logger | ILogger = Logger;
	private static _logLevel: LogLevel = LogLevel.ERROR; // start with the highest log level. Will be set once the app initialized.

	constructor(protected context?: string) {
	}

	static get LogLevel(): LogLevel {
		return Logger._logLevel;
	}

	static getLogLevelName(): string {
		switch (Logger._logLevel) {
			case LogLevel.DEBUG:
				return 'DEBUG';
			case LogLevel.LOG:
				return 'LOG';
			case LogLevel.VERBOSE:
				return 'VERBOSE';
			case LogLevel.WARN:
				return 'WARNING';
			case LogLevel.ERROR:
				return 'ERROR';
			default:
				return `${ Logger._logLevel } not handled`;
		}
	}

	static setLogLevel(level: LogLevel): void {
		Logger._logLevel = level;
	}

	static group(message: any): void {
		console.groupCollapsed(message);
	}

	static groupEnd(): void {
		console.groupEnd();
	}

	static isLogLevelEnabled(level: LogLevel): boolean {
		return level >= Logger._logLevel;
	}

	static log(message: any, context: string = ''): void {
		if (!Logger.isLogLevelEnabled(LogLevel.LOG)) {
			return;
		}
		this.printMessage('log', message, undefined, context);
	}

	static debug(message: any, context: string = ''): void {
		if (!Logger.isLogLevelEnabled(LogLevel.DEBUG)) {
			return;
		}
		this.printMessage('debug', message, blue, context);
	}

	static verbose(message: any, context: string = ''): void {
		if (!Logger.isLogLevelEnabled(LogLevel.VERBOSE)) {
			return;
		}
		this.printMessage('log', message, cyanBright, context);
	}

	static warn(message: any, context: string = ''): void {
		if (!Logger.isLogLevelEnabled(LogLevel.WARN)) {
			return;
		}
		this.printMessage('warn', message, yellow, context);
	}

	static error(message: any, trace: string = '', context: string = ''): void {
		if (!Logger.isLogLevelEnabled(LogLevel.ERROR)) {
			return;
		}
		this.printMessage('error', message, red, context);
		this.printStackTrace(trace);
	}

	static getTimestamp(): string {
		return formatTime(Date.now());
	}

	static testLogs(context?: string): void {
		this.debug('Debug message!', context);
		this.debug({ test: 123, debug: true }, context);
		this.verbose('Verbose message!', context);
		this.verbose({ test: 123, verbose: true }, context);
		this.log('Log message!', context);
		this.log({ test: 123, log: true }, context);
		this.warn('Warn message!', context);
		this.warn(new Error('New Warning'), context);
		this.error('Error message!', undefined, context);
		this.error(new Error('New Error'), undefined, context);
		throw new Error('Native Error thrown!');
	}

	private static printMessage(level: 'log' | 'warn' | 'debug' | 'error', message: any, color: string | undefined, context: string = ''): void {
		let output = message;
		if (isPlainObject(message)) {
			output = `Object:\n${ JSON.stringify(message, null, 2) }\n`;
		} else if (isError(message)) {
			output = message.message;
		}

		const contextColor = context ? yellow : '';
		const contextMessage = context ? `%c[${ context }] ` : '';
		const instance = (this.instance as typeof Logger) ?? Logger;
		const timestamp = instance.getTimestamp ? instance.getTimestamp() : Logger.getTimestamp?.();
		const computedMessage = `${ timestamp } ${ contextMessage } %c${ output }\n`;

		// log complex objects more detailed
		if (isObject(message) && !isPlainObject(message)) {
			Logger.logMessage('groupCollapsed', computedMessage, contextColor, color);

			isError(message) ? console.error(message) : console.dir(message);
			Logger.groupEnd();
		} else {
			Logger.logMessage(level, computedMessage, contextColor, color);
		}
	}

	private static logMessage(level: ConsoleLevel, message: string, contextColor: string | undefined, color: string | undefined): void {
		color = level === 'warn' || level === 'error' ? undefined : color;

		if (!contextColor) {
			console[level](message, color);
		} else {
			console[level](message, contextColor, color);
		}
	}

	private static printStackTrace(trace: string): void {
		if (!trace) {
			return;
		}
		console.error(trace);
	}

	group(message: string, context?: string): void {
		if (!Logger.isLogLevelEnabled(LogLevel.LOG)) {
			return;
		}
		this.callFunction('group', message, context);
	}

	groupEnd(): void {
		if (!Logger.isLogLevelEnabled(LogLevel.LOG)) {
			return;
		}
		Logger.groupEnd();
	}

	log(message: any, context?: string): void {
		this.callFunction('log', message, context);
	}

	debug(message: any, context?: string): void {
		this.callFunction('debug', message, context);
	}

	verbose(message: any, context?: string): void {
		this.callFunction('verbose', message, context);
	}

	warn(message: any, context?: string): void {
		this.callFunction('warn', message, context);
	}

	error(message: any, trace: string = '', context?: string): void {
		const instance = this.getInstance();
		instance && instance.error.call(instance, message, trace, context || this.context);
	}

	setContext(context: string): void {
		this.context = context;
	}

	getTimestamp(): string {
		return Logger.getTimestamp();
	}

	protected getInstance(): ILogger | undefined {
		const { instance } = Logger;
		return instance === this ? Logger : instance;
	}

	private callFunction(name: keyof ILogger, message: any, context?: string): void {
		const instance = this.getInstance();
		const func = instance && (instance as typeof Logger)[name];
		func && func.call(instance, message, context || this.context);
	}
}

const isError = (obj: any): obj is Error =>
	obj instanceof Error || obj instanceof ErrorEvent || (isObject(obj) && (obj as any).error instanceof ErrorEvent);

const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

const isNil = (obj: any): obj is null | undefined => isUndefined(obj) || obj === null;

const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object';

const isPlainObject = (fn: any): fn is object => {
	if (!isObject(fn)) {
		return false;
	}
	const proto = Object.getPrototypeOf(fn);
	if (proto === null) {
		return true;
	}
	const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	return (
		typeof ctor === 'function' &&
		ctor instanceof ctor &&
		Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
	);
};

export function formatTime(timestamp: number, year = false): string {
	const dt = new Intl.DateTimeFormat('en-GB', {
		year: year ? 'numeric' : undefined, month: year ? 'numeric' : undefined, day: year ? 'numeric' : undefined,
		hour: 'numeric', minute: 'numeric', second: 'numeric',
		hour12: false,
	});

	return dt.format(new Date(timestamp));
}
