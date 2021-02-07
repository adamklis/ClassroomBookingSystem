import { Router } from '@angular/router';
import { AuthenticationService } from './../../authentication/service/authentication.service';
import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthGuardService', () => {
  let service = new AuthenticationGuard(null, null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthenticationService, useValue: null},
        {provide: Router, useValue: null}
      ]
    });
    service = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
