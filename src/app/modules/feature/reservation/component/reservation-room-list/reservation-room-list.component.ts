import { IReservation } from './../../interface/reservation.interface';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IRoom } from '../../../room/interface/room.interface';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cbs-reservation-room-list',
  templateUrl: './reservation-room-list.component.html',
  styleUrls: ['./reservation-room-list.component.css']
})
export class ReservationRoomListComponent implements OnInit, OnDestroy {

  faCheck = faCheck;
  faTimes = faTimes;

  @Input()
  public selectedRoom: IRoom;

  @Input()
  public rooms: Observable<IRoom[]>;

  @Input()
  public reservations: Observable<IReservation[]>;

  @Input()
  public disabled = false;

  @Output()
  public roomSelected: EventEmitter<IRoom> = new EventEmitter<IRoom>();

  public list: IRoom[];
  public reservationList: IReservation[];

  private subscription: Subscription;


  constructor() { }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.rooms,
      this.reservations
    ]).subscribe(result => {
      this.list = result[0].filter(room =>
        (result[1].findIndex(reservation => room.uuid === reservation.room.uuid) === -1 && !this.disabled) ||
        room.uuid === this.selectedRoom?.uuid);
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public selectRoom(selectedRoom: IRoom) {
    this.selectedRoom = selectedRoom;
    this.roomSelected.emit(selectedRoom);
  }

  public getTooltipNames(elements: any): string[]{
    if (elements) {
      return elements.map(item => (item.name + ': ' + item.quantity));
    }
    return [];
  }

}
