import { IUser } from './../../user/interface/user.interface';
import { Router } from '@angular/router';
import { UserService } from './../../user/service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public forenameControl = new FormControl('', [Validators.required]);
  public surnameControl = new FormControl('', [Validators.required]);
  public contactControl = new FormControl('', [Validators.required]);


  public registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    forename: this.forenameControl,
    surname: this.surnameControl,
    contact: this.contactControl
  });

  public registerError: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(){
    const newUser: IUser = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      forename: this.registerForm.value.forename,
      surname: this.registerForm.value.surname,
      contact: this.registerForm.value.contact
    };

    this.userService.addUser(newUser).then(() => {
      this.router.navigate(['register', 'success']);
    }).catch(e => this.registerError = e.error);
  }

}
