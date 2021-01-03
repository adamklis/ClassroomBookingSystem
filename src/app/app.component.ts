import { AuthorizationService } from './modules/core/authorization/service/authorization.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Classroom Booking System';
  languages = ['EN', 'PL'];

  constructor(
      private translateService: TranslateService,
      private authorizationService: AuthorizationService,
    ){

  }

  ngOnInit(){
    this.authorizationService.getUserInfo();
  }

  onLanguageChange($event) {
    this.translateService.use($event.target.value.toLowerCase());
  }
}
