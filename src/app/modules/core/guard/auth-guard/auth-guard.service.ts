import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(): boolean {
    if (!this.authService.checkCredentials()){
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
