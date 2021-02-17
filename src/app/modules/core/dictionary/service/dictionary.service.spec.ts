import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: null}
      ]
    });
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
