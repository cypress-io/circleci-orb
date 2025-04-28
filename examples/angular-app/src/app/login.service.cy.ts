import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';

describe('LoginService', () => {
  it('should return a user if logged in', () => {
    cy.intercept('POST', '/auth', {}).then(async () => {
      TestBed.configureTestingModule({
        providers: [LoginService],
        imports: [HttpClientModule],
      });

      const loginService = TestBed.inject(LoginService);

      const res = await firstValueFrom(
        loginService.login('bob', 'the builder')
      );
      expect(res).deep.eq({
        status: 200,
        message: 'bob',
      });
    });
  });

  it('should error if 404', async () => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientModule],
    });

    const loginService = TestBed.inject(LoginService);

    const res = await firstValueFrom(loginService.login('bob', 'the builder'));

    expect(res).deep.eq({
      status: 404,
      message: 'error during the auth, status code: 404',
    });
  });

  it('should error if 401 bad credentials', () => {
    cy.intercept('POST', '/auth', { statusCode: 401 }).then(async () => {
      TestBed.configureTestingModule({
        providers: [LoginService],
        imports: [HttpClientModule],
      });

      const loginService = TestBed.inject(LoginService);

      const res = await firstValueFrom(
        loginService.login('bob', 'the constructor')
      );

      expect(res).deep.eq({
        status: 401,
        message: 'Bad username or password',
      });
    });
  });
});
