import { SharedModule } from './../../shared/shared.module';
import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationDashboardComponent } from './container/reservation-dashboard/reservation-dashboard.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationListComponent } from './component/reservation-list/reservation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReservationDetailsComponent } from './container/reservation-details/reservation-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationRoomListComponent } from './component/reservation-room-list/reservation-room-list.component';


@NgModule({
  declarations: [ReservationDashboardComponent, ReservationListComponent, ReservationDetailsComponent, ReservationRoomListComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule
  ]
})
export class ReservationModule { }
