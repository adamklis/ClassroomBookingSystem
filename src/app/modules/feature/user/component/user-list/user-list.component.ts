import { Observable } from 'rxjs';
import { AuthorizationService } from './../../../../core/authorization/service/authorization.service';
import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../interface/user.interface';
import { faPlus, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  faPen = faPen;
  faPlus = faPlus;
  faInfo = faInfo;
  permissions = Permission;

  @Input()
  public $users: Observable<IUser[]>;

  public users: IUser[];

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.$users.subscribe(users => this.users = users);
  }

}
