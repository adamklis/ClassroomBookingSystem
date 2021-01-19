import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationDashboardComponent } from './container/reservation-dashboard/reservation-dashboard.component';
import { ReservationDetailsComponent } from './container/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: ReservationDashboardComponent },
  { path: ':uuid', component: ReservationDetailsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
