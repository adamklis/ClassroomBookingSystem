import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDashboardComponent } from './appliance-dashboard.component';

describe('ApplianceDashboardComponent', () => {
  let component: ApplianceDashboardComponent;
  let fixture: ComponentFixture<ApplianceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
