import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../user/interface/user.interface';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'cbs-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
