import { AuthorizationService } from './../../../core/authorization/service/authorization.service';
import { AuthenticationService } from '../../../core/authentication/service/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../user/interface/user.interface';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'cbs-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  public username = '';
  constructor(
    public authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
    ) { }

  ngOnInit(): void {
    this.authorizationService.currentUser$.subscribe(user => this.username = `${user?.forename} ${user?.surname}`);
  }

  ngOnDestroy(): void {

  }
}
