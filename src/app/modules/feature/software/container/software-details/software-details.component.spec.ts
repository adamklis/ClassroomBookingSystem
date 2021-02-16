import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SoftwareService } from '../../service/software.service';

import { SoftwareDetailsComponent } from './software-details.component';

describe('SoftwareDetailsComponent', () => {
  let component: SoftwareDetailsComponent;
  let fixture: ComponentFixture<SoftwareDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, TranslateModule.forRoot()],
      declarations: [ SoftwareDetailsComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => {}}}}},
        {provide: SoftwareService, useValue: null},
        {provide: Router, useValue: null},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
