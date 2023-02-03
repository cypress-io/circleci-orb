import { SecondButtonComponent } from './second-button.component';

describe('SecondButtonComponent', () => {
  it('can mount', () => {
    cy.mount(SecondButtonComponent);
    cy.contains('second-button works');
  });
});
