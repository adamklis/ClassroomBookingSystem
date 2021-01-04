import { AuthorizationService } from './../../authorization/service/authorization.service';
import { Permission } from './../../authorization/enum/permission.enum';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild, CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.canActivate(route);
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedPermissions: Permission[] = route.data.expectedPermissions;
    if (!expectedPermissions) { return Promise.resolve(true); }

    let user = this.authorizationService.currentUser$.getValue();
    if (!user){
      await this.authorizationService.getUserInfo();
      user = this.authorizationService.currentUser$.getValue();
    }

    let permissionFound = false;

    if (user) {
      const userPermissions = user.permissions;
      expectedPermissions.forEach(expectedPermission => {
          if (userPermissions.findIndex(permission => permission === expectedPermission) !== -1) { permissionFound = true; }
      });
    }
    if (permissionFound) {
      return Promise.resolve(true);
    } else {
      this.router.navigate(['unathorized']);
      return Promise.resolve(false);
    }

  }
}
