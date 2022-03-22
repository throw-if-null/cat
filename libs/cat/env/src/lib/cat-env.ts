interface BuildInformation {
	date: string;
	version: string;
	branch: string;
	revision: string
}

export interface CatEnvironment {
	build: BuildInformation;
	production: boolean;
	auth0: {
		clientId: string;
		audience: string;
		domain: string;
		scope: string;
		errorPath: string;
		httpInterceptor: {
			allowedList: {
				uri: string;
				tokenOptions: {
					audience: string;
					scope: string
				}
			}[]
		}
	};
	applicationInsights: {
		instrumentationKey: string;
		enabled: boolean
	};
	rat: {
		apiUri: string;
		mock: boolean
	};
}
