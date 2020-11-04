import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './container/user-dashboard/user-dashboard.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserDashboardComponent, UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  exports: [UserRoutingModule]
})
export class UserModule {
  constructor( public translateModule: TranslateModule ) {}
}
