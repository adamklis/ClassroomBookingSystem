import { Permission } from './../../authorization/enum/permission.enum';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const expectedPermissions: Permission[] = route.data.expectedPermissions;
    if (!expectedPermissions) { return true; }

    // TODO: check user permissions
    if (expectedPermissions.findIndex(permission => permission === Permission.RESERVATION_VIEW) === -1) {
      return true;
    } else {
      this.router.navigate(['unathorized']);
      return false;
    }
  }
}
