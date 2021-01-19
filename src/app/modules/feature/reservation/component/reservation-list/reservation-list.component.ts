import { IReservation } from './../../interface/reservation.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPen, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';

@Component({
  selector: 'cbs-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input()
  public reservations: IReservation[];

  faPen = faPen;
  faPlus = faPlus;
  faInfo = faInfo;
  permissions = Permission;

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

}
