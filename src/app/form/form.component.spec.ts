import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';

import { FormComponent } from './form.component';

let fixture: ComponentFixture<FormComponent>,
  app: FormComponent,
  DOM: HTMLElement,
  authServiceMock: any;
describe('FormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, FormsModule, HttpClientModule
      ],
      declarations: [
        FormComponent
      ],
      providers: [
        FormBuilder,
        {provider:AuthService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormComponent); // test ready
    TestBed.inject(FormBuilder);
    authServiceMock = TestBed.inject(AuthService);
    app = fixture.componentInstance; // instance
    DOM = fixture.nativeElement; // DOM
    fixture.detectChanges();
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  describe('Test ngOnInit', () => {
    it('Test login form with initial data', () => {
      const loginForm = {
        "email": "",
        "password": ""
      }
      expect(app.loginForm.value).toEqual(loginForm)
    })
  })

  describe('Test loginForm', () => {
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

  describe('Test login', () => {
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
      app.loginForm.setValue(loginForm);
      const spyloginUser = jest.spyOn(authServiceMock, 'login').mockReturnValue(of(reponse));
      app.login(loginForm);
      expect(spyloginUser).toHaveBeenCalledWith(loginForm);
      expect(app.isLoggedIn).toBeTruthy();
    })

    // it('Test failed login', ()=> {
    //   const loginForm = {
    //     "email": "murugan",
    //     "password": "9751501688"
    //   }
    //   component.loginForm.setValue(loginForm);
    //  // const spyloginUser = jest.spyOn(authServiceMock, 'login').mockReturnValue(of(reponse));
    //   component.login(loginForm);
    // 	expect(authServiceMock.login).not.toHaveBeenCalledWith(loginForm);
    //   expect(component.isLoggedIn).toBeFalsy();
    // })
  })
})