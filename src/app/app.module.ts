import { TestComponent } from './modules/shared/component/test/test.component';
import { RegisterSuccessComponent } from './modules/feature/home/register/register-success/register-success.component';
import { Permission } from './modules/core/authorization/enum/permission.enum';
import { UnathorizedComponent } from './modules/feature/home/unathorized/unathorized.component';
import { HealthCheckComponent } from './modules/core/health-check/health-check.component';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { HomeModule } from './modules/feature/home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StartComponent } from './modules/feature/home/start/start.component';
import { LoginComponent } from './modules/feature/home/login/login.component';
import { RegisterComponent } from './modules/feature/home/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationGuard } from './modules/core/guard/authentication/authentication.guard';
import { AuthorizationGuard } from './modules/core/guard/authorization/authorization.guard';
import { HttpAuthorizedInterceptor } from './modules/core/interceptoprs/http-authorized-interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', canActivate: [AuthorizationGuard], component: StartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register/success', component: RegisterSuccessComponent },
      { path: 'unathorized', component: UnathorizedComponent },
      { path: 'test', component: TestComponent },
      { path: 'api/health', component: HealthCheckComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', children: [
        {
          path: 'reservations',
          data: {expectedPermissions: [Permission.RESERVATION_VIEW, Permission.RESERVATION_VIEW_USER]},
          loadChildren: () => import('./modules/feature/reservation/reservation.module').then(m => m.ReservationModule)
        },
        {
          path: 'rooms',
          data: {expectedPermissions: [Permission.ROOM_VIEW]},
          loadChildren: () => import('./modules/feature/room/room.module').then(m => m.RoomModule)
        },
        {
          path: 'appliances',
          data: {expectedPermissions: [Permission.APPLIANCE_VIEW]},
          loadChildren: () => import('./modules/feature/appliance/appliance.module').then(m => m.ApplianceModule)
        },
        {
          path: 'software',
          data: {expectedPermissions: [Permission.SOFTWARE_VIEW]},
          loadChildren: () => import('./modules/feature/software/software.module').then(m => m.SoftwareModule)
        },
        {
          path: 'users',
          data: {expectedPermissions: [Permission.USER_VIEW]},
          loadChildren: () => import('./modules/feature/user/user.module').then(m => m.UserModule)
        }
      ], canActivateChild: [AuthorizationGuard, AuthenticationGuard]},
      { path: '**', redirectTo: 'home' },
    ]),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  }),
    NgbModule,
    CoreModule,
    HomeModule,
    SharedModule
  ],
  providers: [TranslateService, CookieService, {provide: HTTP_INTERCEPTORS, useClass: HttpAuthorizedInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
