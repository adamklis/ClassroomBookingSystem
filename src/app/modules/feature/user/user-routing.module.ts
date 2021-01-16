import { AuthenticationGuard } from './../../core/guard/authentication/authentication.guard';
import { UserPermissionsComponent } from './container/user-permissions/user-permissions.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './container/user-dashboard/user-dashboard.component';
import { Permission } from '../../core/authorization/enum/permission.enum';
import { AuthorizationGuard } from '../../core/guard/authorization/authorization.guard';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: ':uuid', component: UserDetailsComponent },
  {
    path: ':uuid/permissions',
    component: UserPermissionsComponent,
    data: {expectedPermissions: [Permission.PERMISSION_VIEW]},
    canActivate: [AuthorizationGuard, AuthenticationGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
