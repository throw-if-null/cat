// import { Logger } from "@cat/shared/logger";
//
//
// interface TrackingMethods {
// 	trackEvent(eventName: string, data?: any): void;
//
// 	startTracking(eventName: string): void;
//
// 	finishTracking(eventName: string): void;
// }
//
// interface TrackerOptions {
// 	enabled: boolean;
// }
// export class Tracker implements TrackingMethods {
//
// 	 public static appInsights: ApplicationInsights;
// 	private static logger = new Logger('TrackerService');
//
// 	static initializeAI(options: TrackerOptions): void {
// 		if (!options.enabled) {
// 			return;
// 		}
//
// 		this.logger.log(`Initialzing AppInsights in {${ process.env.STAGE }}`);
//
// 		// Tracker.appInsights = new ApplicationInsights({
// 		// 	config: {
// 		// 		instrumentationKey: environment.appInsights.instrumentationKey,
// 		// 		disableCookiesUsage: true,
// 		// 		enableAutoRouteTracking: true,
// 		// 		disableExceptionTracking: true,
// 		// 		disableFetchTracking: false,
// 		// 		correlationHeaderExcludedDomains: ['sentry'], // prevents sentry CORS errors
// 		// 		samplingPercentage: environment.appInsights.samplingPercentage,
// 		// 		distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
// 		// 		excludeRequestFromAutoTrackingPatterns: ['aptrinsic'],
// 		// 		enableCorsCorrelation: true,
// 		// 		enableRequestHeaderTracking: true,
// 		// 		enableResponseHeaderTracking: true
// 		// 	}
// 		// });
// 		// Tracker.appInsights.loadAppInsights();
// 	}
//
// 	static trackEvent(name: string, data?: any): void {
// 		if (!Tracker.appInsights) {
// 			return;
// 		}
// 		Tracker.appInsights.trackEvent({
// 			name,
// 			properties: data
// 		});
// 	}
//
// 	static startTracking(name: string): void {
// 		if (!Tracker.appInsights) {
// 			return;
// 		}
// 		Tracker.appInsights.startTrackEvent(name);
// 	}
//
// 	static finishTracking(trackerName: string): void {
// 		if (!Tracker.appInsights) {
// 			return;
// 		}
//
// 		Tracker.appInsights.stopTrackEvent(trackerName);
// 	}
//
// }
