import { UserResolver } from './../../core/authorization/service/user.resolver';
import { RoomDetailsComponent } from './container/room-details/room-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDashboardComponent } from './container/room-dashboard/room-dashboard.component';


const routes: Routes = [
  { path: '', component: RoomDashboardComponent, resolve: {user: UserResolver} },
  { path: ':uuid', component: RoomDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class RoomRoutingModule { }
