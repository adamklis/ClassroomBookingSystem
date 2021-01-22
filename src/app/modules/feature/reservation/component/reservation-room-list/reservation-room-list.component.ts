import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IRoom } from '../../../room/interface/room.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cbs-reservation-room-list',
  templateUrl: './reservation-room-list.component.html',
  styleUrls: ['./reservation-room-list.component.css']
})
export class ReservationRoomListComponent implements OnInit, OnDestroy {

  faCheck = faCheck;
  faTimes = faTimes;

  @Input()
  public rooms: Observable<IRoom[]>;
  private roomSubscription: Subscription;

  @Output()
  public roomSelected: EventEmitter<IRoom> = new EventEmitter<IRoom>();

  public list: IRoom[];
  public selectedRoom: IRoom;


  constructor() { }

  ngOnInit(): void {
     this.roomSubscription = this.rooms.subscribe(rooms => this.list = rooms);
  }

  ngOnDestroy(): void {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
  }

  public selectRoom(selectedRoom: IRoom) {
    this.selectedRoom = selectedRoom;
    this.roomSelected.emit(selectedRoom);
  }

  public getTooltipNames(elements: any): string[]{
    return elements.map(item => (item.name + ': ' + item.quantity));
  }

}
