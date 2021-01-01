import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnathorizedComponent } from './unathorized/unathorized.component';



@NgModule({
  declarations: [
    StartComponent,
    LoginComponent,
    RegisterComponent,
    UnathorizedComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
  constructor( public translate: TranslateService ){}
 }
