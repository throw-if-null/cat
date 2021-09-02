export const environment = {
	production: true,
	auth0: {
		domain: 'throwifnull.eu.auth0.com',
		clientId: 'qJdHl8g2FXY4spCxXVM2hZlk3SOBJnY2',
		audience: '{API_IDENTIFIER}',
		apiUri: 'http://rat:3001',
		appUri: 'https://catus.azurewebsites.net',
		errorPath: '/error',
		httpInterceptor: {
			allowedList: [
				{
					// Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
					uri: 'https://rat/api/*',
					tokenOptions: {
						// The attached token should target this audience
						audience: 'https://rat/api',

						// The attached token should have these scopes
						scope: 'read:current_user'
					}
				}
			]
		}
	},
};
