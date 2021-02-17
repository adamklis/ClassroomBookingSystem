import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnathorizedComponent } from './unathorized/unathorized.component';
import { RegisterSuccessComponent } from './register/register-success/register-success.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    StartComponent,
    LoginComponent,
    RegisterComponent,
    UnathorizedComponent,
    RegisterSuccessComponent,
    AboutComponent
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
