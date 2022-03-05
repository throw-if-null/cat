//
// type ErrorSeverity = "critical" | "error" | "warning";
//
// interface ReporterMethods {
// 	captureMessage(message: string, severity?: ErrorSeverity, contexts?: any): void;
// 	captureException(error: any, severity?: ErrorSeverity, context?: any): void;
// }
//
// export class ErrorReporter implements ReporterMethods {
//
// 	// static captureMessage(message: any, severity?: ErrorSeverity, contexts?: Contexts): void {
// 	// 	const level = severity ?? '';
// 	// 	const context = {
// 	// 		level: Severity.fromString(level),
// 	// 		contexts
// 	// 	};
// 	// 	Sentry.captureMessage(message, context);
// 	// }
// 	// static captureException(error: any, captureContext?: CaptureContext): void {
// 	// 	Sentry.setExtra('error', error);
// 	// 	Sentry.captureException(error, captureContext);
// 	// }
// 	//
// }
