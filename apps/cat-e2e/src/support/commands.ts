// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		loginViaUI(): void;
	}
}

Cypress.Commands.add('loginViaUI', () => {
	Cypress.log({
		displayName: 'AUTH0 LOGIN',
		message: [`🔐 Authenticating using Password`]
	});

	cy.visit('/');
	cy.get('#username').type(Cypress.env('auth_email'));
	cy.get('#password').type(Cypress.env('auth_password'));
	cy.get('button[type=submit]').first().click();
});
// Cypress.Commands.add('login2', (userType = {}) => {
// 	Cypress.log({
// 		displayName: 'AUTH0 LOGIN',
// 		message: [`🔐 Authenticating using Password`]
// 	});
//
//
// 	const requestCode = {
// 		method: 'GET',
// 		url: `https://throwifnull.eu.auth0.com/authorize?response_type=code&client_id=qJdHl8g2FXY4spCxXVM2hZlk3SOBJnY2&redirect_uri=http://localhost:4200/&scope=openid profile email&audience=${ Cypress.env('auth_audience') }&state=some-random-cypress-state`
// 	};
//
// 	const requestTokenOptions = {
// 		method: 'POST',
// 		url: Cypress.env('auth_url'),
// 		body: {
// 			grant_type: 'password',
// 			client_id: Cypress.env('auth_client_id'),
// 			client_secret: Cypress.env('auth_client_secret'),
// 			username: Cypress.env('auth_email'),
// 			password: Cypress.env('auth_password'),
// 			audience: Cypress.env('auth_audience'),
// 			scope: 'openid profile email'
// 		}
// 	};
//
// 	cy.request(requestTokenOptions)
// 	  .then(({ body }) => {
// 		  const user: any = jwt.decode(body.id_token);
//
// 		  const userItem = {
// 			  token: body.access_token,
// 			  user: {
// 				  sub: user.sub,
// 				  nickname: user.nickname,
// 				  picture: user.name,
// 				  email: user.email,
// 			  },
// 		  };
//
// 		  window.localStorage.setItem("auth0Cypress", JSON.stringify(userItem));
// 	  });
// });

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
