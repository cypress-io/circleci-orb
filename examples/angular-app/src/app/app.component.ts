import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { take } from 'rxjs/operators';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginService } from './login.service';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  imports: [WelcomeComponent, LoginFormComponent, HttpClientModule, CommonModule],
  providers: [LoginService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // `cypress/angular` mounts with zoneless change detection, which does not
  // re-render on plain field mutations made from an async subscribe callback
  isAuthed = signal(false)
  errorMessage = signal('');
  username = signal('')

  constructor(private readonly loginService: LoginService) {}

  handleLogin(username: string, password: string): void {
    this.errorMessage.set('');

    this.loginService.login(username, password).pipe(
      take(1),
    ).subscribe((response) => {
      if (response.status === 200) {
        this.isAuthed.set(true)
        this.username.set(username)
      } else {
        this.errorMessage.set(response.message)
      }
    })
  }

  logout(): void {
    console.log('logout');
    this.isAuthed.set(false);
  }
}
