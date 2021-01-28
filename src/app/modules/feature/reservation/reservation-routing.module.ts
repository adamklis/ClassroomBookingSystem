import { ReservationResolver } from './service/reservation.resolver';
import { UserResolver } from './../../core/authorization/service/user.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationDashboardComponent } from './container/reservation-dashboard/reservation-dashboard.component';
import { ReservationDetailsComponent } from './container/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: ReservationDashboardComponent, resolve: {user: UserResolver} },
  { path: ':uuid', component: ReservationDetailsComponent, resolve: {user: UserResolver, reservation: ReservationResolver}},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver, ReservationResolver]
})
export class ReservationRoutingModule { }
