import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUser } from 'src/app/modules/feature/user/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {

  constructor(private authorizationService: AuthorizationService) { }
  resolve(): Promise<IUser> {
    return this.authorizationService.currentUser;
  }
}
