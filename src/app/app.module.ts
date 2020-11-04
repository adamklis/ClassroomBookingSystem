import { CoreModule } from './modules/core/core.module';
import { HomeModule } from './modules/feature/home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { StartComponent } from './modules/feature/home/start/start.component';
import { LoginComponent } from './modules/feature/home/login/login.component';
import { RegisterComponent } from './modules/feature/home/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
      { path: '', component: StartComponent },
      { path: '', children: [
        { path: 'reservations', loadChildren: () => import('./modules/feature/reservation/reservation.module').then(m => m.ReservationModule) },
        { path: 'rooms', loadChildren: () => import('./modules/feature/room/room.module').then(m => m.RoomModule) },
        { path: 'appliances', loadChildren: () => import('./modules/feature/appliance/appliance.module').then(m => m.ApplianceModule) },
        { path: 'software', loadChildren: () => import('./modules/feature/software/software.module').then(m => m.SoftwareModule) },
        { path: 'users', loadChildren: () => import('./modules/feature/user/user.module').then(m => m.UserModule) }
      ]},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: '' },
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
    HomeModule
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
