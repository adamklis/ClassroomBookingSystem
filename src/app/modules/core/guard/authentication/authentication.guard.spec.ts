import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthGuardService', () => {
  let service: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
