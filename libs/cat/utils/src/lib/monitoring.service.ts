import { Inject, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CatEnvironment } from "@cat/domain";
import { AngularPlugin } from "@microsoft/applicationinsights-angularplugin-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ErrorReporter } from "@ratcat/error";
import { Logger } from "@ratcat/logger";
import { Tracker } from "@ratcat/monitoring";

// only use in lazy loaded features
@Injectable({
	providedIn: 'root'
})
export class MonitoringService {

	private tracker: Tracker;
	private errorReporter: ErrorReporter;
	private logger = new Logger('MonitoringService');

	constructor(private router: Router, @Inject('CAT_ENVIRONMENT') private environment: CatEnvironment) {
		this.logger.debug('MonitoringService constructed');

		const angularPlugin = new AngularPlugin();
		const appInsights = new ApplicationInsights({
			config: {
				instrumentationKey: this.environment.applicationInsights.instrumentationKey,
				extensions: [ angularPlugin ],
				extensionConfig: {
					[angularPlugin.identifier]: { router: this.router }
				}
			}
		});

		this.tracker = new Tracker(appInsights, { enabled: environment.applicationInsights.enabled });
		this.errorReporter = new ErrorReporter(appInsights, { enabled: environment.applicationInsights.enabled });
	}

	trackEvent(name: string, data?: { [key: string]: any }) {
		this.tracker.trackEvent(name, data);
	}

	startTrack(name: string) {
		this.tracker.startTracking(name);
	}

	endTrack(name: string) {
		this.tracker.finishTracking(name);
	}

	trackMetric(name: string, average: number, data?: { [key: string]: any }) {
		this.tracker.trackMetric(name, average, data);
	}

	logException(exception: Error, severityLevel?: number) {
		this.errorReporter.captureException(exception, severityLevel);
	}
}
