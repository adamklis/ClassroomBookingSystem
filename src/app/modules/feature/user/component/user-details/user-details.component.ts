import { PermissionsMode } from './../../../../core/authorization/enum/permissions-mode.enum';
import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { IModalBody } from 'src/app/modules/shared/modal/interface/modal-body';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interface/user.interface';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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


  public userForm = new FormGroup({
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
    this.user = this.activatedRoute.snapshot.data.user;
    this.resetForm();
  }

  public onPermissionsClick(){
    if (!this.userForm.dirty) {
      const navigationExtras: NavigationExtras = {state: {user: this.user}};
      this.router.navigate(['users', this.user.uuid, 'permissions'], navigationExtras);
    } else {
      this.translateService.get([
        'USER.MODAL.UNSAVED_CHANGES_TITLE',
        'USER.MODAL.UNSAVED_CHANGES_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['USER.MODAL.UNSAVED_CHANGES_TITLE'], message: translation['USER.MODAL.UNSAVED_CHANGES_MESSAGE']}).then();
      });
    }
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
        this.userService.getUser(this.user.uuid).toPromise().then(user => {
          this.user = user;
          this.resetForm();
        });
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
    this.userService.saveUser(this.getFormUserObject())
    .then(user => {
      this.translateService.get([
        'USER.MODAL.SAVE_USER_SUCCESS_TITLE',
        'USER.MODAL.SAVE_USER_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['USER.MODAL.SAVE_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.SAVE_USER_SUCCESS_MESSAGE']});
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
      });
    })
    .catch(err => {
      this.translateService.get([
        'SHARED.VALIDATION.ERROR',
        err.error
      ],
      {forename: this.user.forename, surname: this.user.surname})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: translation[err.error]})
        .then(() => {});
      });
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
        this.userForm.reset();
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    this.user = this.getFormUserObject();
    this.userService.addUser(this.user)
    .then(user => {
      this.translateService.get([
        'USER.MODAL.ADD_USER_SUCCESS_TITLE',
        'USER.MODAL.ADD_USER_SUCCESS_MESSAGE'
      ],
      {forename: this.user.forename, surname: this.user.surname})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['USER.MODAL.ADD_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.ADD_USER_SUCCESS_MESSAGE']})
        .then(() => {
          this.user = user;
          this.router.navigate(['users', user.uuid]);
          this.resetForm();
        });
      });
    })
    .catch(err => {
      this.translateService.get([
        'SHARED.VALIDATION.ERROR',
        err.error
      ],
      {forename: this.user.forename, surname: this.user.surname})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: translation[err.error]})
        .then(() => {});
      });
      this.user = null;
    });


  }

  public isProtected(): boolean{
    return this.user && this.user.permissions &&
    this.user.permissions.findIndex(permission => permission === Permission.PROTECTED_USER) !== -1;
  }

  private resetForm(): void{
    if (this.user) {
      this.emailControl.setValue(this.user.email);
      this.passwordControl.setValue('');
      this.forenameControl.setValue(this.user.forename);
      this.surnameControl.setValue(this.user.surname);
      this.contactControl.setValue(this.user.contact);
      if (this.isProtected()) {
        this.emailControl.disable();
        this.passwordControl.disable();
      }
    } else {
      this.userForm.reset();
    }
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }

  private getFormUserObject(): IUser {
    return {
      uuid: this.user ? this.user.uuid : null,
      forename: this.forenameControl.value,
      surname: this.surnameControl.value,
      contact: this.contactControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value
    };
  }

}
