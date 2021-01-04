import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../interface/user.interface';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  faPen = faPen;
  faPlus = faPlus;
  permissions = Permission;

  @Input()
  users: Array<IUser>;

  constructor() { }

  ngOnInit(): void {
  }

}
