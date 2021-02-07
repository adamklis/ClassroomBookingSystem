import { SoftwareService } from './../../../software/service/software.service';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RoomDashboardComponent } from './room-dashboard.component';
import { ApplianceService } from '../../../appliance/service/appliance.service';
import { RoomService } from '../../service/room.service';

describe('RoomDashboardComponent', () => {
  let component: RoomDashboardComponent;
  let fixture: ComponentFixture<RoomDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ RoomDashboardComponent ],
      providers: [
        {provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: {permissions: []},
                reservation: {room: {name: ''}, user: {forename: '', surname: ''}}
              }
            }
          }
        },
        {provide: SoftwareService, useValue: null},
        {provide: ApplianceService, useValue: null},
        {provide: RoomService, useValue: null},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
