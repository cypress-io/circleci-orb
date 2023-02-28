describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains('angular-app app is running!');
  });
});
