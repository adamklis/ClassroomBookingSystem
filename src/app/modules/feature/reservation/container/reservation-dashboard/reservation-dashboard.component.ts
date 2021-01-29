import { SortOrder } from './../../../../shared/enum/sort-order.enum';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from './../../service/reservation.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/interface/user.interface';
import { IReservation } from '../../interface/reservation.interface';

@Component({
  selector: 'cbs-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  public reservations: IReservation[];
  private currentUser: IUser;

  constructor(private activatedRoute: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.user;
    if (this.currentUser.permissions.findIndex(
      permission => permission === Permission.RESERVATION_VIEW || permission === Permission.RESERVATION_VIEW_USER) !== -1
    ){
      if (this.currentUser.permissions.findIndex(permission => permission === Permission.RESERVATION_VIEW) !== -1){
        this.reservationService.getReservations([], [new Sort('dateFrom', SortOrder.ASCEND)])
          .subscribe(reservations => this.reservations = reservations);
      } else {
        this.reservationService.getReservations([new Filter('user.uuid', this.currentUser.uuid)], [new Sort('dateFrom', SortOrder.ASCEND)])
          .subscribe(reservations => this.reservations = reservations);
      }
    }
  }

}
