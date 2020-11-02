import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareDashboardComponent } from './software-dashboard.component';

describe('SoftwareDashboardComponent', () => {
  let component: SoftwareDashboardComponent;
  let fixture: ComponentFixture<SoftwareDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
