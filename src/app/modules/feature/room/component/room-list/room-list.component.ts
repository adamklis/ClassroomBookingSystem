import { IRoom } from './../../interface/room.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  faPlus = faPlus;
  faPen = faPen;

  @Input()
  public rooms: IRoom[];

  constructor() { }

  ngOnInit(): void {
  }

}
