import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('can mount', () => {
    cy.mount(ButtonComponent);
    cy.contains('button works');
  });
});
