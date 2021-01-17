import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loginControl = new FormControl('', [Validators.required]);
  public emailControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);
  public forenameControl = new FormControl('', [Validators.required]);
  public surnameControl = new FormControl('', [Validators.required]);
  public contactControl = new FormControl('', [Validators.required]);


  public registerForm = new FormGroup({
    login: this.loginControl,
    email: this.emailControl,
    password: this.passwordControl,
    forename: this.forenameControl,
    surname: this.surnameControl,
    contact: this.contactControl
  });

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
