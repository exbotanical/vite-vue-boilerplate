declare namespace Cypress {
	interface Chainable {
		getByTestId(selector: string, opts?: any[]): Chainable<JQuery>;
	}
}
