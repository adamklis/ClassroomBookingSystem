import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'cbs-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public users: IUser[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
