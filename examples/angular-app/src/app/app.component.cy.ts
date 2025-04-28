import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should redirect to welcome screen when creds are correct', () => {
    cy.mount(AppComponent);
    cy.contains('Username').find('input').type('testuser');
    cy.contains('Password').find('input').type('testPassword');
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {
        status: 200,
        message: 'Authenticated',
      },
    });
    cy.get('button').contains('Login').contains('Login').click();
    cy.contains('Welcome testuser');
  });

  it('should show error message when creds are incorrect', () => {
    cy.mount(AppComponent);
    cy.contains('Username').find('input').type('baduser');
    cy.contains('Password').find('input').type('badpassword');
    cy.intercept('POST', '/auth', {
      statusCode: 401,
      body: {
        status: 401,
        message: 'Bad username or password',
      },
    });
    cy.get('button').contains('Login').click();
    cy.contains('Bad username or password');
  });
});
