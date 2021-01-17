import { PermissionAssignment } from './../../../../core/authorization/model/permission-assignment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { IUser } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import { PermissionGroup } from 'src/app/modules/core/authorization/enum/permission-group.enum';

@Component({
  selector: 'cbs-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faTimes = faTimes;

  permissions = Permission;
  permissionsMode = PermissionsMode;
  permissionList = Object.keys(Permission).sort((a, b) => a.localeCompare(b));
  permissionPresets = PermissionAssignment.getPermissionAssignments();
  public user: IUser;
  public userPermissions: Permission[];

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    if (state.user){
      this.user = state.user;
      this.userPermissions = JSON.parse(JSON.stringify(this.user.permissions));
    } else {
      router.navigate(['users']);
    }
  }

  ngOnInit() {
  }

  public hasPermission(permission: Permission): boolean {
    return this.userPermissions.findIndex(userPermission => userPermission === permission) !== -1;
  }

  public switchPermission(permission: Permission): void {
    const permissionFound = this.userPermissions.find(userPermission => userPermission === permission);
    if (!permissionFound) {
      this.userPermissions.push(permission);
    } else {
      this.userPermissions = this.userPermissions.filter(userPermission => userPermission !== permission);
    }
  }

  public setPreset(preset: {permissionGroup: PermissionGroup, permissions: Permission[]}){
    this.userPermissions = preset.permissions;
  }

  public permissionsChanged(): boolean{
    if (this.userPermissions.length !== this.user.permissions.length) { return true; }
    this.userPermissions.forEach( permission => {
      if (!this.user.permissions.find(userPermission => userPermission === permission)) { return true; }
    });

    this.user.permissions.forEach( permission => {
      if (!this.userPermissions.find(userPermission => userPermission === permission)) { return true; }
    });

    return false;
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
        this.userPermissions = JSON.parse(JSON.stringify(this.user.permissions));
      })
      .catch(error => {});
    });
  }

  public onSaveClick(){
    this.userService.saveUserPermissions(this.user.uuid, this.userPermissions).then(() => {
      this.translateService.get([
        'USER.MODAL.SAVE_USER_SUCCESS_TITLE',
        'USER.MODAL.SAVE_USER_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['USER.MODAL.SAVE_USER_SUCCESS_TITLE'], message: translation['USER.MODAL.SAVE_USER_SUCCESS_MESSAGE']});
      });
    })
  }

  public isProtected(): boolean{
    return this.user && this.user.permissions.findIndex(permission => permission === Permission.PROTECTED_USER) !== -1;
  }

}
