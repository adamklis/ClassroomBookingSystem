import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './../../../core/authentication/service/authentication.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';
import { doesNotReject } from 'assert';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ LoginComponent ],
      providers: [
        {provide: Router, useValue: null},
        {provide: AuthenticationService, useValue: {
          login: (login: string, password: string) =>  password === 'password' ? Promise.resolve() : Promise.reject({error: 'error'})
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit login', async () => {
    const loginControl = fixture.debugElement.nativeElement.querySelector('#login');
    const passwordControl = fixture.debugElement.nativeElement.querySelector('#password');
    loginControl.value = 'login';
    passwordControl.value = 'password';
    let authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'login').and.callThrough();
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
    expectAsync(component.loginError).toBeRejected({error: 'error'});
  });
});
