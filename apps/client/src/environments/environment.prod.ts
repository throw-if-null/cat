export const environment = {
	production: true,
	auth0: {
		domain: 'throwifnull.eu.auth0.com',
		clientId: 'qJdHl8g2FXY4spCxXVM2hZlk3SOBJnY2',
		audience: '{API_IDENTIFIER}',
		apiUri: 'https://rattus.azurewebsites.net/api',
		appUri: 'https://catus.azurewebsites.net',
		errorPath: '/error',
		httpInterceptor: {
			allowedList: [
				{
					// Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
					uri: 'https://rattus.azurewebsites.net/api*',
					tokenOptions: {
						// The attached token should target this audience
						audience: 'https://rattus.azurewebsites.net/api',

						// The attached token should have these scopes
						scope: 'read:current_user'
					}
				}
			]
		}
	},
	rat: {
		apiUri: 'https://rattus.azurewebsites.net/api'
	}
};
