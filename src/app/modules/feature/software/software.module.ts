import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareDashboardComponent } from './container/software-dashboard/software-dashboard.component';


@NgModule({
  declarations: [SoftwareDashboardComponent],
  imports: [
    CommonModule,
    SoftwareRoutingModule
  ]
})
export class SoftwareModule { }
