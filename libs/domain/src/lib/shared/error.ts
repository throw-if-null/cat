export type ErrorSeverity = "critical" | "error" | "warning";

export interface ReporterMethods {
	captureException(error: any, severity?: ErrorSeverity, context?: any): void;
}

export interface ReporterOptions {
	enabled: boolean;
}
