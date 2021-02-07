import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDetailsComponent } from './appliance-details.component';
import { ApplianceService } from '../../service/appliance.service';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('ApplianceDetailsComponent', () => {
  let component: ApplianceDetailsComponent;
  let fixture: ComponentFixture<ApplianceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ ApplianceDetailsComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => ''}}}},
        {provide: Router, useValue: null},
        {provide: ApplianceService, useValue: {getAppliances: () => of([])}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
