import { AuthorizationService } from './../../authorization/service/authorization.service';
import { Permission } from './../../authorization/enum/permission.enum';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const expectedPermissions: Permission[] = route.data.expectedPermissions;
    if (!expectedPermissions) { return true; }

    this.authorizationService.getUserInfo().then( () => {
      let permissionFound = false;
      const user = this.authorizationService.currentUser$.getValue();
      if (user) {
        const userPermissions = user.permissions;
        expectedPermissions.forEach(expectedPermission => {
            if (userPermissions.findIndex(permission => permission === expectedPermission) !== -1) { permissionFound = true; }
        });
      }
      if (permissionFound) {
        return true;
      } else {
        this.router.navigate(['unathorized']);
        return false;
      }
    }).catch(() => {
      this.router.navigate(['login']);
      return false;
    });

  }
}
