import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApplianceService } from './appliance.service';

describe('ApplianceService', () => {
  let service: ApplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: null}
      ]
    });
    service = TestBed.inject(ApplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
