import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRoomListComponent } from './reservation-room-list.component';

describe('ReservationRoomListComponent', () => {
  let component: ReservationRoomListComponent;
  let fixture: ComponentFixture<ReservationRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
