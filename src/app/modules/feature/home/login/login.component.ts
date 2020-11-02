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

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }

}
