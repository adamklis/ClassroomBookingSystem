import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { RoomService } from './../../service/room.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsComponent } from './room-details.component';
import { ApplianceService } from '../../../appliance/service/appliance.service';
import { SoftwareService } from '../../../software/service/software.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('RoomDetailsComponent', () => {
  let component: RoomDetailsComponent;
  let fixture: ComponentFixture<RoomDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ RoomDetailsComponent ],
      providers: [
        {provide: AuthorizationService, useValue: {hasPermissions: () => {}}},
        {provide: SoftwareService, useValue: {getSoftwareUseList: () => {}}},
        {provide: ApplianceService, useValue: {getApplianceUseList: () => {}}},
        {provide: RoomService, useValue: null},
        {provide: Router, useValue: null},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => {}}}}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
