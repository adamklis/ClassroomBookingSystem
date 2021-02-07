import { SoftwareService } from './../../service/software.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareDashboardComponent } from './software-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('SoftwareDashboardComponent', () => {
  let component: SoftwareDashboardComponent;
  let fixture: ComponentFixture<SoftwareDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ SoftwareDashboardComponent ],
      providers: [
        {provide: SoftwareService, useValue: {getSoftwareList: () => of({page: {limit: 0, size: 0, start: 0}, results: []})}}]
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
