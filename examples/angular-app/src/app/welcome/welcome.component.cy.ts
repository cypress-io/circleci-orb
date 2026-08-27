import { createOutputSpy } from 'cypress/angular';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  it('should mount with greeting', () => {
    cy.mount(WelcomeComponent, {
      componentProperties: {
        username: 'Test User',
      },
    }).then((response) => {
      cy.spy(response.component.onLogout, 'emit').as('onLogout');
    });
    cy.contains('Welcome Test User');
  });

  it('when the log out button is clicked, onLogout should be called using createOutputSpy', () => {
    cy.mount(WelcomeComponent, {
      componentProperties: {
        onLogout: createOutputSpy('onLogoutSpy'),
      },
    });
    cy.get('button').contains('Log Out').click();
    cy.get('@onLogoutSpy').should('have.been.called');
  });
});
