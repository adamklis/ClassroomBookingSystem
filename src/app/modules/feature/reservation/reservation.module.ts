import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationDashboardComponent } from './container/reservation-dashboard/reservation-dashboard.component';
import { ReservationRoutingModule } from './reservation-routing.module';


@NgModule({
  declarations: [ReservationDashboardComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
