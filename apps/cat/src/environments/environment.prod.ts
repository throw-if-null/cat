import { CatEnvironment } from "@cat/domain";
import { build } from './build';


export const environment: CatEnvironment = {
	build,
	production: true,
	auth0: {
		domain: 'throwifnull.eu.auth0.com',
		audience: 'https://rattus.azurewebsites.net/',
		clientId: 'qJdHl8g2FXY4spCxXVM2hZlk3SOBJnY2',
		errorPath: '/error',
		scope: 'read:current_user',
		httpInterceptor: {
			allowedList: [
				{
					// Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
					uri: 'https://rattus.azurewebsites.net/api*',
					tokenOptions: {
						// The attached token should target this audience
						audience: 'https://rattus.azurewebsites.net/',

						// The attached token should have these scopes
						scope: 'read:current_user'
					}
				}
			]
		}
	},
	applicationInsights: {
		instrumentationKey: '7344c5e9-276b-45e3-a869-7b72dc91a5c1',
		enabled: true
	},
	rat: {
		mock: false,
		apiUri: 'https://rattus.azurewebsites.net/api'
	}
};
