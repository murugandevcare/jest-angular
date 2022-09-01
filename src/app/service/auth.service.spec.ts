import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

const httpClientSpy = { post: jest.fn() };

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers: [AuthService,
      {provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test:Login', ()=> {
    const reponse = {
      "code": 200,
      "data": "fake data"
    }
    const loginForm = {
      "email": "murugan@devcare.biz",
      "password": "9751501688"
    }
    it('Test Login Success', (done:any) => {
      let postSpy = jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(reponse));
      service.login(loginForm).subscribe({
        next: (data) => {
          expect(data).toEqual(reponse);
          expect(postSpy).toBeDefined()
          expect(postSpy).toBeCalledTimes(1);
          done(); 
        }
      })
     // expect(postSpy).toHaveBeenCalledWith(url);
    })
  })
});