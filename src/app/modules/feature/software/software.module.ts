import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareDashboardComponent } from './container/software-dashboard/software-dashboard.component';
import { SoftwareListComponent } from './component/software-list/software-list.component';
import { SoftwareDetailsComponent } from './container/software-details/software-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SoftwareDashboardComponent, SoftwareListComponent, SoftwareDetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SoftwareRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SoftwareModule {
  constructor( public translateModule: TranslateModule ) {}

}
