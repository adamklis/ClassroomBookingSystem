import { ActivatedRoute } from '@angular/router';
import { IUser } from './../../../user/interface/user.interface';
import { IReservation } from './../../interface/reservation.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPen, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cbs-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input()
  public $reservations: Observable<IReservation[]>;

  public reservations: IReservation[];

  faPen = faPen;
  faPlus = faPlus;
  faInfo = faInfo;
  permissions = Permission;

  private currentUser: IUser;

  constructor(public authorizationService: AuthorizationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.user;
    this.$reservations.subscribe(reservations => this.reservations = reservations);
  }

  public hasEditPermission(reservation: IReservation): boolean{
    return(
      this.currentUser.permissions.findIndex(permission => permission === this.permissions.RESERVATION_EDIT) !== -1 ||
      this.currentUser.permissions.findIndex(permission => permission === this.permissions.RESERVATION_EDIT_USER) !== -1 &&
      (!reservation || reservation.user.uuid === this.currentUser.uuid)
    );
  }

}
