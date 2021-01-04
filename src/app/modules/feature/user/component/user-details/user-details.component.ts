import { PermissionsMode } from './../../../../core/authorization/enum/permissions-mode.enum';
import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { IModalBody } from 'src/app/modules/shared/modal/interface/modal-body';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  permissions = Permission;
  permissionsMode = PermissionsMode;

  public user: IUser;

  public emailControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', []);
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
    ) {}

  ngOnInit(): void {
    const userUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    this.userService.getUser(userUuid).subscribe(user => {
      this.user = user;
      this.resetForm();
    });
  }

  public onRestoreClick(){
    this.translateService.get([
      'USER.MODAL.RESTORE_USER_TITLE',
      'USER.MODAL.RESTORE_USER_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['USER.MODAL.RESTORE_USER_TITLE'], message: translation['USER.MODAL.RESTORE_USER_MESSAGE']})
      .then(() => {
        this.resetForm();
      })
      .catch(error => {});
    });

  }

  public onDeleteClick(){
    const modalBody: IModalBody = {};

    this.translateService
    .get([
      'USER.MODAL.DELETE_USER_TITLE',
      'USER.MODAL.DELETE_USER_MESSAGE',
      'USER.MODAL.DELETE_USER_SUCCESS_TITLE',
      'USER.MODAL.DELETE_USER_SUCCESS_MESSAGE'
    ],
    {forename: this.user.forename, surname: this.user.surname})
    .toPromise()
    .then(translation => {
      this.modalService.showDeleteModal({
        title: translation['USER.MODAL.DELETE_USER_TITLE'],
        message: translation['USER.MODAL.DELETE_USER_MESSAGE']
      })
      .then(() => {
        this.userService.deleteUser(this.user.uuid);
        this.modalService.showInfoModal({title: translation['USER.MODAL.DELETE_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.DELETE_USER_SUCCESS_MESSAGE']})
        .then(() => this.router.navigate(['users']));
      })
      .catch(error => {});
    });
  }

  public onSaveClick(){
    this.userService.saveUser(this.getFormUserObject());
    this.translateService.get([
      'USER.MODAL.SAVE_USER_SUCCESS_TITLE',
      'USER.MODAL.SAVE_USER_SUCCESS_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showInfoModal({title: translation['USER.MODAL.SAVE_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.SAVE_USER_SUCCESS_MESSAGE']});
    });
  }

  public onClearClick(){
    this.translateService.get([
      'USER.MODAL.RESTORE_USER_TITLE',
      'USER.MODAL.RESTORE_USER_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['USER.MODAL.RESTORE_USER_TITLE'], message: translation['USER.MODAL.RESTORE_USER_MESSAGE']})
      .then(() => {
        this.registerForm.reset();
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    this.user = this.getFormUserObject();
    this.userService.addUser(this.user);

    this.translateService.get([
      'USER.MODAL.ADD_USER_SUCCESS_TITLE',
      'USER.MODAL.ADD_USER_SUCCESS_MESSAGE'
    ],
    {forename: this.user.forename, surname: this.user.surname})
    .toPromise()
    .then(translation => {
      this.modalService.showInfoModal({title: translation['USER.MODAL.ADD_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.ADD_USER_SUCCESS_MESSAGE']})
      .then(() => {
        this.user = null;
        this.resetForm();
      });
    });
  }

  private resetForm(): void{
    if (this.user) {
      this.emailControl.setValue(this.user.email);
      this.passwordControl.setValue('');
      this.forenameControl.setValue(this.user.forename);
      this.surnameControl.setValue(this.user.surname);
      this.contactControl.setValue(this.user.contact);
    } else {
      this.registerForm.reset();
    }
  }

  private getFormUserObject(): IUser {
    return {
      uuid: this.user ? this.user.uuid : null,
      forename: this.forenameControl.value,
      surname: this.surnameControl.value,
      contact: this.contactControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      permissions: []
    };
  }

}
