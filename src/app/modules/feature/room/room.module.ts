import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomDashboardComponent } from './container/room-dashboard/room-dashboard.component';


@NgModule({
  declarations: [RoomDashboardComponent],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
