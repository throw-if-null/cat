import { TrackerOptions, TrackingMethods } from "@cat/domain";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { Logger } from "@ratcat/logger";


export class Tracker implements TrackingMethods {

	private readonly logger = new Logger('Tracker');

	constructor(private appInsights: ApplicationInsights, private readonly options: TrackerOptions) {
		this.logger.log(`Initializing Tracker. {${ options.enabled }}`);
		if (typeof this.appInsights.core.isInitialized !== 'undefined' && !this.appInsights.core.isInitialized()) {
			this.logger.log(`Loading ApplicationInsights`);
			this.appInsights.loadAppInsights();
		}
	}

	trackEvent(name: string, properties?: { [key: string]: any }) {
		if (!this.options.enabled) {
			return;
		}
		this.appInsights.trackEvent({ name }, properties);
	}

	trackMetric(name: string, average: number, properties?: { [key: string]: any }) {
		if (!this.options.enabled) {
			return;
		}
		this.appInsights.trackMetric({ name, average }, properties);
	}

	startTracking(name: string): void {
		if (!this.options.enabled) {
			return;
		}

		this.appInsights.startTrackEvent(name);
	}

	finishTracking(trackerName: string): void {
		if (!this.options.enabled) {
			return;
		}

		this.appInsights.stopTrackEvent(trackerName);
	}

}
