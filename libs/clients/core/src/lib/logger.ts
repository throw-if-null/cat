import { Logger as ILogger, LogLevel } from './types/logger';
import { formatTime } from "./utils";

const consoleColor = {
	white: 'color: white; background: gray;',
	green: 'color: #bada55;',
	yellow: 'color: #f4d03f;',
	red: 'color: #ED4337;',
	magentaBright: 'color: #e056fd;',
	cyanBright: 'color: #22a6b3;',
	blue: 'color: #4d88ff;'
};

/**
 * Logging utility class
 * inspiration gathered from Nest.js Logging https://docs.nestjs.com/techniques/logger
 */
export class Logger implements ILogger {
	protected static instance?: typeof Logger | ILogger = Logger;
	private static _logLevel: LogLevel = LogLevel.ERROR; // start with the highest log level. Will be set once the app initialized.
	private static lastTimestamp?: number;

	constructor(protected context?: string, private readonly isTimestampEnabled: boolean = false) {
	}

	static get LogLevel(): LogLevel {
		return Logger._logLevel;
	}

	static getLogLevelName(): string {
		switch (Logger._logLevel) {
			case LogLevel.DEBUG:
				return 'DEBUG';
			case LogLevel.VERBOSE:
				return 'VERBOSE';
			case LogLevel.ERROR:
				return 'ERROR';
			case LogLevel.NONE:
				return 'NONE';
			default:
				return `${ Logger._logLevel } not handled`;
		}
	}

	static setLogLevel(level: LogLevel): void {
		Logger._logLevel = level;
	}

	static isLogLevelEnabled(level: LogLevel): boolean {
		return level >= Logger._logLevel;
	}

	static debug(message: any, context: string = '', isTimeDiffEnabled: boolean = true): void {
		if (!Logger.isLogLevelEnabled(LogLevel.DEBUG)) {
			return;
		}
		this.printMessage('debug', message, consoleColor.blue, context, isTimeDiffEnabled);
	}

	static verbose(message: any, context: string = '', isTimeDiffEnabled: boolean = true): void {
		if (!Logger.isLogLevelEnabled(LogLevel.VERBOSE)) {
			return;
		}
		this.printMessage('log', message, consoleColor.cyanBright, context, isTimeDiffEnabled);
	}

	static error(message: any, trace: string = '', context: string = '', isTimeDiffEnabled: boolean = true): void {
		if (!Logger.isLogLevelEnabled(LogLevel.ERROR)) {
			return;
		}
		this.printMessage('error', message, consoleColor.red, context, isTimeDiffEnabled);
		this.printStackTrace(trace);
	}

	static getTimestamp(): string {
		return formatTime(Date.now());
	}

	static testLogs(context?: string) {
		this.debug('Debug message!', context);
		this.debug({ test: 123, debug: true }, context);
		this.verbose('Verbose message!', context);
		this.verbose({ test: 123, verbose: true }, context);
		this.error('Error message!', undefined, context);
		this.error(new Error('New Error'), undefined, context, false);
		throw new Error('Native Error thrown!');
	}

	private static printMessage(
		level: 'log' | 'debug' | 'error',
		message: any,
		color: string | undefined,
		context: string = '',
		isTimeDiffEnabled?: boolean
	): void {
		const output = isPlainObject(message)
			? `Object:\n${ JSON.stringify(message, null, 2) }\n`
			: isError(message)
				? message.message
				: message;

		const contextColor = context ? consoleColor.yellow : '';
		const contextMessage = context ? `%c[${ context }] ` : '';
		const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);
		const timestampColor = timestampDiff.length ? consoleColor.white : '';
		const instance = (this.instance as typeof Logger) ?? Logger;
		const timestamp = instance.getTimestamp ? instance.getTimestamp() : Logger.getTimestamp?.();
		const computedMessage = `${ timestamp } ${ contextMessage } %c${ output } ${ timestampDiff }\n`;

		Logger.logMessage(level, computedMessage, contextColor, color, timestampColor);

	}

	private static logMessage(
		level: 'log' | 'debug' | 'info' | 'warn' | 'error',
		message: string,
		contextColor: string | undefined,
		color: string | undefined,
		timestampColor: string
	) {
		color = level === 'warn' || level === 'error' ? undefined : color;

		if (!contextColor) {
			console[level](message, color, timestampColor);
		} else {
			console[level](message, contextColor, color, timestampColor);
		}
	}

	private static updateAndGetTimestampDiff(isTimeDiffEnabled?: boolean): string {
		let result = '';
		if (Logger.lastTimestamp && isTimeDiffEnabled) {
			result = `%c +${ Date.now() - Logger.lastTimestamp }ms `;
			Logger.lastTimestamp = Date.now();
			return result;
		}
		Logger.lastTimestamp = Date.now();
		return result;
	}

	private static printStackTrace(trace: string): void {
		if (!trace) {
			return;
		}
		console.error(trace);
	}

	debug(message: any, context?: string): void {
		this.callFunction('debug', message, context);
	}

	verbose(message: any, context?: string): void {
		this.callFunction('verbose', message, context);
	}

	error(message: any, trace: string = '', context?: string): void {
		const instance = this.getInstance();
		instance && instance.error.call(instance, message, trace, context || this.context, this.isTimestampEnabled);
	}

	setContext(context: string): void {
		this.context = context;
	}

	getTimestamp(): string {
		return Logger.getTimestamp();
	}

	protected getInstance(): ILogger | typeof Logger | undefined {
		const { instance } = Logger;
		return instance === this ? Logger : instance;
	}

	private callFunction(name: 'debug' | 'verbose', message: any, context?: string): void {
		const instance = this.getInstance();
		const func = instance && (instance as typeof Logger)[name];
		func && func.call(instance, message, context || this.context, this.isTimestampEnabled);
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
