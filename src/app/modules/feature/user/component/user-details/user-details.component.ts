import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cbs-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;

  public loginControl = new FormControl('', [Validators.required]);
  public emailControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('');
  public forenameControl = new FormControl('', [Validators.required]);
  public surnameControl = new FormControl('', [Validators.required]);
  public contactControl = new FormControl('', [Validators.required]);
  public roleControl = new FormControl('', [Validators.required]);


  public registerForm = new FormGroup({
    login: this.loginControl,
    email: this.emailControl,
    password: this.passwordControl,
    forename: this.forenameControl,
    surname: this.surnameControl,
    contact: this.contactControl,
    role: this.roleControl
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    const userUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    this.userService.getUser(userUuid).subscribe(user => {
      if (user) {
        this.user = user;
        this.onRestoreClick();
      }
    });
  }

  onRestoreClick(){
    this.loginControl.setValue(this.user.login);
    this.emailControl.setValue(this.user.email);
    this.forenameControl.setValue(this.user.forename);
    this.surnameControl.setValue(this.user.surename);
    this.contactControl.setValue(this.user.contact);
    this.roleControl.setValue(this.user.role);
  }

  onDeleteClick(){
    this.userService.deleteUser(this.user.uuid);
  }

  onSaveClick(){
    this.user = {
        uuid: this.user.uuid,
        forename: this.forenameControl.value,
        surename: this.surnameControl.value,
        contact: this.contactControl.value,
        role: this.roleControl.value,
        email: this.emailControl.value,
        login: this.loginControl.value
    };
    this.userService.saveUser(this.user);
  }

  onClearClick(){
    this.registerForm.reset();
  }

  onAddClick(){
    this.user = {
      uuid: '',
      forename: this.forenameControl.value,
      surename: this.surnameControl.value,
      contact: this.contactControl.value,
      role: this.roleControl.value,
      email: this.emailControl.value,
      login: this.loginControl.value
    };
    this.userService.addUser(this.user);
  }

}
