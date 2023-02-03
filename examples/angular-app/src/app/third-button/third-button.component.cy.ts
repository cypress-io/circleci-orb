import { ThirdButtonComponent } from './third-button.component';

describe('ThirdButtonComponent', () => {
  it('can mount', () => {
    cy.mount(ThirdButtonComponent);
    cy.contains('third-button works');
  });
});
