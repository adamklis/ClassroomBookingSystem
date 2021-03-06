import { ApplianceDetailsComponent } from './container/appliance-details/appliance-details.component';
import { ApplianceDashboardComponent } from './container/appliance-dashboard/appliance-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ApplianceDashboardComponent },
  { path: ':uuid', component: ApplianceDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplianceRoutingModule { }
