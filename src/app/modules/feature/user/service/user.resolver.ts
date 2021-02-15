import { UserService } from './user.service';
import { IUser } from './../interface/user.interface';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {

  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    const userUuid = route.paramMap.get('uuid');
    if (userUuid && userUuid !== '0') {
      return this.userService.getUser(userUuid);
    }
  }

}
