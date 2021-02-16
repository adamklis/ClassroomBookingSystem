import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputListComponent } from './search-input-list.component';

describe('SearchInputListComponent', () => {
  let component: SearchInputListComponent;
  let fixture: ComponentFixture<SearchInputListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputListComponent);
    component = fixture.componentInstance;
    component.$searchResults = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
