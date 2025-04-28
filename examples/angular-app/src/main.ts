import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { worker } from './mocks'

// Start a mock API server to handle auth requests
worker.start({
  onUnhandledRequest: 'bypass',
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
