import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { RoomService } from './../../../room/service/room.service';
import { UserService } from './../../../user/service/user.service';
import { ApplianceService } from './../../../appliance/service/appliance.service';
import { SoftwareService } from './../../../software/service/software.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationService } from '../../service/reservation.service';

import { ReservationDetailsComponent } from './reservation-details.component';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsComponent;
  let fixture: ComponentFixture<ReservationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, TranslateModule.forRoot()],
      declarations: [ ReservationDetailsComponent ],
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
        {provide: Router, useValue: null},
        {provide: ReservationService, useValue: null},
        {provide: SoftwareService, useValue: null},
        {provide: ApplianceService, useValue: null},
        {provide: UserService, useValue: null},
        {provide: RoomService, useValue: null},
        {provide: AuthorizationService, useValue: null}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
