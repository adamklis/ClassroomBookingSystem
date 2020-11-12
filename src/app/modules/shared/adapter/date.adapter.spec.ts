import { TestBed } from '@angular/core/testing';

import { DateAdapter } from './date.adapter';

describe('DateAdapterService', () => {
  let service: DateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
