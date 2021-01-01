import { AuthenticationService } from '../../authentication/service/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivateChild(): boolean {
    if (!this.authService.checkCredentials()){
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
