import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Classroom Booking System';
  languages = ['EN', 'PL'];

  constructor(
      private translateService: TranslateService
    ){

  }

  onLanguageChange($event) {
    this.translateService.use($event.target.value.toLowerCase());
  }
}
