import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

import { FormComponent } from './form.component';

let fixture: ComponentFixture<FormComponent>,
  app: FormComponent,
  DOM: HTMLElement;

 const mockAuthService = {
  login: jest.fn()
 };
describe('FormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, FormsModule
      ],
      declarations: [
        FormComponent
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent); // test ready
    app = fixture.componentInstance; // instance
    DOM = fixture.nativeElement; // DOM
    fixture.detectChanges();
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  describe('Test:ngOnInit', () => {
    it('Test login form with initial data', () => {
      const loginForm = {
        "email": "",
        "password": ""
      }
      expect(app.loginForm.value).toEqual(loginForm)
    })
  })

  describe('Test:loginForm', () => {
    it('Test login form with invalid data', () => {
      app.loginForm.controls['email'].setValue('');
      app.loginForm.controls['password'].setValue('');
      expect(app.loginForm.valid).toBeFalsy();
    })

    it('Test login form with valid data', () => {
      app.loginForm.controls['email'].setValue('murugan@devcare.biz');
      app.loginForm.controls['password'].setValue('9751501688');
      expect(app.loginForm.valid).toBeTruthy();
    })
  })

  describe('Test:LoginButton', () => {
    it('Test button enabled', () => {
      const loginForm = {
        "email": "murugan@devcare.biz",
        "password": "9751501688"
      }
      app.loginForm.setValue(loginForm);
      fixture.detectChanges();
      expect(!DOM.querySelector('button')?.disabled).toBeTruthy();
    })

    it('Test button disabled', () => {
      const loginForm = {
        "email": "",
        "password": ""
      }
      app.loginForm.setValue(loginForm);
      fixture.detectChanges();
      expect(!DOM.querySelector('button')?.disabled).toBeFalsy();
    })
  })

  describe('Test:loginmethod', () => {
    it('Test success login', () => {
      const loginForm = {
        "email": "murugan@devcare.biz",
        "password": "9751501688"
      }
      const reponse = {
        "code": 200,
        "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZmlyc3ROYW1lIjoiTXVydWdhbiIsImxhc3ROYW1lIjoiTSIsImVtYWlsIjoibXVydWdhbkBkZXZjYXJlLmJpeiIsInBob25lIjo5NzUxNTAxNjg4LCJyb2xlIjoiQURNSU4ifSwiaWF0IjoxNjYxODUyMjE4LCJleHAiOjE2NjE4NTU4MTh9.AI13i4w8PPzSW6OXev-I5ws88_Jgc7e8hrkMyaN0rWA"
        }
      }
      const resetLoginForm = {
        "email": "",
        "password": ""
      }
      app.loginForm.setValue(loginForm);
      let spy = jest.spyOn(mockAuthService, 'login').mockReturnValue(of(reponse));
      app.login(loginForm);
      expect(spy).toHaveBeenCalledWith(loginForm);
      expect(app.isLoggedIn).toBeTruthy();
      expect(app.loginForm.value).toEqual(resetLoginForm)
    })

    it('Test error login', ()=> {
      const loginForm = {
        "email": "murugan@devcare.com",
        "password": "9751501688"
      }
      const reponse = {
        "code": 401,
        "error": "error"
      }
      app.loginForm.setValue(loginForm);
      let spy = jest.spyOn(mockAuthService, 'login').mockReturnValue(throwError(() => of(reponse)));
      app.login(loginForm);
      expect(spy).toHaveBeenCalledWith(loginForm);
      expect(app.isLoggedIn).toBeFalsy();
    })
  })
})