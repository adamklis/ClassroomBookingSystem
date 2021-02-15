import { of } from 'rxjs';
import { HealthCheckService } from './modules/core/health-check/health-check.service';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthorizationService, useValue: {getUserInfo: () => {}}},
        {provide: HealthCheckService, useValue: {status: of(true)}}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Classroom Booking System'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Classroom Booking System');
  });

  it(`should change language`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onLanguageChange({target: {value: app.languages[0]}});
  });

});
