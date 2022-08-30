import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: any
  beforeEach(() => {
    service = new AuthService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
