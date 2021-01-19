import { ReservationService } from './../../service/reservation.service';
import { IReservation } from './../../interface/reservation.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  public reservations: IReservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => this.reservations = reservations);
  }

}
