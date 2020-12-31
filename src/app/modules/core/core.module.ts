import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MenuComponent } from './menu/menu.component';
import { HealthCheckComponent } from './health-check/health-check.component';

@NgModule({
  declarations: [
    MenuComponent,
    HealthCheckComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MenuComponent
  ]
})
export class CoreModule {
  constructor( public translate: TranslateService ){}
 }
