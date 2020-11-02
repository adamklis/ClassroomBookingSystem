import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDashboardComponent } from './container/room-dashboard/room-dashboard.component';


const routes: Routes = [
  { path: '', component: RoomDashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
