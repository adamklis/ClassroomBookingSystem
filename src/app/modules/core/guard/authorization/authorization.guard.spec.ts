import { AuthorizationService } from './../../authorization/service/authorization.service';
import { TestBed } from '@angular/core/testing';

import { AuthorizationGuard } from './authorization.guard';
import { Router } from '@angular/router';

describe('AuthorizationGuardGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthorizationService, useValue: null},
        {provide: Router, useValue: null}
      ]
    });
    guard = TestBed.inject(AuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
