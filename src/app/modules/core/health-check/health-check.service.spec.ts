import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: null}
      ]});
    service = TestBed.inject(HealthCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
