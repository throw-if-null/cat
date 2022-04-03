import { ReporterMethods, ReporterOptions } from "@cat/domain";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { Logger } from "@ratcat/logger";

export class ErrorReporter implements ReporterMethods {

	private logger = new Logger('ErrorReporter');

	constructor(private appInsights: ApplicationInsights, private readonly options: ReporterOptions) {
		this.logger.log(`Initializing ErrorReporter. {${ options.enabled }}`);
		if (typeof this.appInsights.core.isInitialized !== 'undefined' && !this.appInsights.core.isInitialized()) {
			this.appInsights.loadAppInsights();
		}
	}

	captureException(exception: any, severityLevel?: any): void {
		if (!this.options.enabled) {
			return;
		}
		this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
	}

}
