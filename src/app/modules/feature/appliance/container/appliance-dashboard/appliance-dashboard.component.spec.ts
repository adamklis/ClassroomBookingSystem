import { ApplianceService } from './../../service/appliance.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDashboardComponent } from './appliance-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('ApplianceDashboardComponent', () => {
  let component: ApplianceDashboardComponent;
  let fixture: ComponentFixture<ApplianceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ ApplianceDashboardComponent ],
      providers: [
        {provide: ApplianceService, useValue: {getAppliances: () => of({page: {limit: 0, size: 0, start: 0}, results: []})}}
      ]
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
