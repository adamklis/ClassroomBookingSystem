import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MenuComponent } from './menu/menu.component';
import { PermissionsDirective } from './authorization/directive/permissions.directive';

@NgModule({
  declarations: [
    MenuComponent,
    PermissionsDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MenuComponent,
    PermissionsDirective
  ]
})
export class CoreModule {
  constructor( public translate: TranslateService ){}
 }
