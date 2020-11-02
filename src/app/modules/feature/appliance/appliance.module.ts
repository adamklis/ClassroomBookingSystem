import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplianceRoutingModule } from './appliance-routing.module';
import { ApplianceDashboardComponent } from './container/appliance-dashboard/appliance-dashboard.component';


@NgModule({
  declarations: [ApplianceDashboardComponent],
  imports: [
    CommonModule,
    ApplianceRoutingModule
  ]
})
export class ApplianceModule { }
