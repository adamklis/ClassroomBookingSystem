import { IRoom } from './../../interface/room.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cbs-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  faPlus = faPlus;
  faPen = faPen;
  faInfo = faInfo;
  permissions = Permission;

  @Input()
  public $rooms: Observable<IRoom[]>;
  public rooms: IRoom[];

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.$rooms.subscribe(rooms => this.rooms = rooms);
  }

}
