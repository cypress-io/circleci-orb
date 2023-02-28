import { FourthButtonComponent } from './fourth-button.component';

describe('FourthButtonComponent', () => {
  it('can mount', () => {
    cy.mount(FourthButtonComponent);
    cy.contains('fourth-button works');
  });
});
