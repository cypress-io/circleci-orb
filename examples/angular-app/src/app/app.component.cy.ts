import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  it('can mount', () => {
    cy.mount(AppComponent, {
      imports: [AppModule],
    });
    cy.contains('angular-app app is running!');
  });
});
