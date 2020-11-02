import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './container/user-dashboard/user-dashboard.component';


@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [UserRoutingModule]
})
export class UserModule { }
