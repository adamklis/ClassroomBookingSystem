import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SoftwareService } from './software.service';

describe('SoftwareService', () => {
  let service: SoftwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: null}
      ]
    });
    service = TestBed.inject(SoftwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
