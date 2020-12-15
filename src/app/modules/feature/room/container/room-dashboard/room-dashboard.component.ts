import { RoomService } from './../../service/room.service';
import { IRoom } from './../../interface/room.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.css']
})
export class RoomDashboardComponent implements OnInit {

  public rooms: IRoom[];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

}
