import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRoomListComponent } from './reservation-room-list.component';
import { of } from 'rxjs';

describe('ReservationRoomListComponent', () => {
  let component: ReservationRoomListComponent;
  let fixture: ComponentFixture<ReservationRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ ReservationRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRoomListComponent);
    component = fixture.componentInstance;
    component.rooms = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
