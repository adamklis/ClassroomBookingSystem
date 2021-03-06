import { SoftwareDetailsComponent } from './container/software-details/software-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareDashboardComponent } from './container/software-dashboard/software-dashboard.component';


const routes: Routes = [
  { path: '', component: SoftwareDashboardComponent },
  { path: ':uuid', component: SoftwareDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
