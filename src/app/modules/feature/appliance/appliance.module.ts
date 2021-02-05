import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared/shared.module';
import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplianceRoutingModule } from './appliance-routing.module';
import { ApplianceDashboardComponent } from './container/appliance-dashboard/appliance-dashboard.component';
import { ApplianceDetailsComponent } from './container/appliance-details/appliance-details.component';
import { ApplianceListComponent } from './component/appliance-list/appliance-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ApplianceDashboardComponent, ApplianceDetailsComponent, ApplianceListComponent],
  imports: [
    CommonModule,
    ApplianceRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
    SharedModule,
    NgbModule
  ]
})
export class ApplianceModule { }
