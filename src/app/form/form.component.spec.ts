import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let mockFormBuilder: FormBuilder;
  let authServiceMock: any;
  beforeEach(() => {
    mockFormBuilder = new FormBuilder();
    authServiceMock = {
			login: jest.fn()
		};
    component = new FormComponent(mockFormBuilder,authServiceMock);
    component.ngOnInit();
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit', () => {
    it('Test login form with initial data', () => {
      const loginForm = {
        "email": "",
        "password": ""
      }
      expect(component.loginForm.value).toEqual(loginForm)
    })
  })

  describe('Test loginForm', ()=> {
    it('Test login form with invalid data', () => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    })

    it('Test login form with valid data', () => {
      component.loginForm.controls['email'].setValue('murugan@devcare.biz');
      component.loginForm.controls['password'].setValue('9751501688');
      expect(component.loginForm.valid).toBeTruthy();
    })
  })

  describe('Test login', () => {
    it('Test success login', ()=> {
      const loginForm = {
        "email": "murugan@devcare.biz",
        "password": "9751501688"
      }
      const reponse = {
        "code": 200,
        "data": {
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZmlyc3ROYW1lIjoiTXVydWdhbiIsImxhc3ROYW1lIjoiTSIsImVtYWlsIjoibXVydWdhbkBkZXZjYXJlLmJpeiIsInBob25lIjo5NzUxNTAxNjg4LCJyb2xlIjoiQURNSU4ifSwiaWF0IjoxNjYxODUyMjE4LCJleHAiOjE2NjE4NTU4MTh9.AI13i4w8PPzSW6OXev-I5ws88_Jgc7e8hrkMyaN0rWA"
        }
      }
      component.loginForm.setValue(loginForm);
      const spyloginUser = jest.spyOn(authServiceMock, 'login').mockReturnValue(of(reponse));
      component.login(loginForm);
			expect(spyloginUser).toHaveBeenCalledWith(loginForm);
      expect(component.isLoggedIn).toBeTruthy();
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
});
