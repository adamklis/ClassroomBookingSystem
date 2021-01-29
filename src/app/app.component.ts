import { Subscription } from 'rxjs';
import { HealthCheckService } from './modules/core/health-check/health-check.service';
import { AuthorizationService } from './modules/core/authorization/service/authorization.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'cbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Classroom Booking System';
  languages = ['EN', 'PL'];

  public backendState = false;
  public backendStateSubscription: Subscription;

  constructor(
      private translateService: TranslateService,
      private authorizationService: AuthorizationService,
      public healthCheckService: HealthCheckService
    ){

  }

  ngOnInit(){
    this.authorizationService.getUserInfo();
    this.backendStateSubscription = this.healthCheckService.status.subscribe(state => this.backendState = state);
  }

  ngOnDestroy(){
    if (this.backendStateSubscription){
      this.backendStateSubscription.unsubscribe();
    }
  }

  public onLanguageChange($event) {
    this.translateService.use($event.target.value.toLowerCase());
  }
}
