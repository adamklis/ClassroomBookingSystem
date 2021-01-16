import { AuthenticationService } from '../../authentication/service/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild, CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.checkCredentials()){
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
