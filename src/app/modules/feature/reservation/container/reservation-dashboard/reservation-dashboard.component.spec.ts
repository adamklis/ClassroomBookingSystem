import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../user/service/user.service';
import { RoomService } from './../../../room/service/room.service';
import { ReservationService } from './../../service/reservation.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ReservationDashboardComponent } from './reservation-dashboard.component';

describe('ReservationDashboardComponent', () => {
  let component: ReservationDashboardComponent;
  let fixture: ComponentFixture<ReservationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, TranslateModule.forRoot()],
      declarations: [ ReservationDashboardComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {data: {user: {permissions: []}}}}},
        {provide: ReservationService, useValue: null},
        {provide: RoomService, useValue: null},
        {provide: UserService, useValue: null},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
