import { SharedModule } from './../../shared/shared.module';
import { CoreModule } from './../../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomDashboardComponent } from './container/room-dashboard/room-dashboard.component';
import { RoomDetailsComponent } from './container/room-details/room-details.component';
import { RoomListComponent } from './component/room-list/room-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UseListComponent } from './component/use-list/use-list.component';


@NgModule({
  declarations: [RoomDashboardComponent, RoomDetailsComponent, RoomListComponent, UseListComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ]
})
export class RoomModule { }
