export interface TrackingMethods {
	trackEvent(name: string, properties?: { [key: string]: any }): void;

	trackMetric(name: string, average: number, properties?: { [key: string]: any }): void;

	startTracking(eventName: string): void;

	finishTracking(eventName: string): void;
}

export interface TrackerOptions {
	enabled: boolean;
}
