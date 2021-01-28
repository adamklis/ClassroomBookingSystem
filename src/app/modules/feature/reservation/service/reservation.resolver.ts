import { ReservationService } from './reservation.service';
import { IReservation } from './../interface/reservation.interface';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationResolver implements Resolve<IReservation> {

  constructor(private reservationService: ReservationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReservation> {
    const reservationUuid = route.paramMap.get('uuid');
    if (reservationUuid && reservationUuid !== '0') {
      return this.reservationService.getReservation(reservationUuid);
    }
  }

}
