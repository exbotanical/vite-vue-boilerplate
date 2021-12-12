/**
 * Select a `data-testid` element by its exact key
 */
Cypress.Commands.add('getByTestId', (selector) => {
	return cy.get(`[data-testid=${selector}]`);
});
