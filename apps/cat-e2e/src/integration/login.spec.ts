describe('login', () => {
	it('should successfully log into Cat', () => {
		cy.loginViaUI();
		cy.get('.header__title').contains('Dashboard').should('be.visible');
	});
});
