import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputListComponent } from './search-input-list.component';

describe('SearchInputComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
