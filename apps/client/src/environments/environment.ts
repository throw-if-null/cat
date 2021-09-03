// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: 'throwifnull.eu.auth0.com',
    clientId: 'qJdHl8g2FXY4spCxXVM2hZlk3SOBJnY2',
    audience: 'https://rattus.azurewebsites.net/',
    errorPath: '/error',
    scope: 'read:current_user',
    httpInterceptor: {
      allowedList: [
        {
          // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
          uri: '/api/*',
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
  rat: {
    apiUri: '/api'  // 'https://d6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
