import { Inject, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ErrorReporter } from "@cat/shared/error";
import { Logger } from "@cat/shared/logger";
import { Tracker } from "@cat/shared/monitoring";
import { AngularPlugin } from "@microsoft/applicationinsights-angularplugin-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

@Injectable({
	providedIn: 'root'
})
export class MonitoringService {

	private tracker: Tracker;
	private errorReporter: ErrorReporter;
	private logger = new Logger('MonitoringService');

	constructor(private router: Router, @Inject('APPINSIGHTS_KEY') private appInsightsKey: string) {
		this.logger.debug('MonitoringService constructed');

		const angularPlugin = new AngularPlugin();
		const appInsights = new ApplicationInsights({
			config: {
				instrumentationKey: this.appInsightsKey,
				extensions: [ angularPlugin ],
				extensionConfig: {
					[angularPlugin.identifier]: { router: this.router }
				}
			}
		});

		this.tracker = new Tracker(appInsights, { enabled: true });
		this.errorReporter = new ErrorReporter(appInsights, { enabled: true });
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
