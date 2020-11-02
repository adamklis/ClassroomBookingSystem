import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationDashboardComponent } from './container/reservation-dashboard/reservation-dashboard.component';

const routes: Routes = [
  { path: '', component: ReservationDashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
