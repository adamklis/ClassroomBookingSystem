import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cbs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);

  public loginForm = new FormGroup({
    login: this.loginControl,
    password: this.passwordControl
  });

  public loginError: string;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password)
    .then(() => {this.router.navigate(['home']); } )
    .catch(err => {
      this.loginError = err.error;
    });
  }

}
