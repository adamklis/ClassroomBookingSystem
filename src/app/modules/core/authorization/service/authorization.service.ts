import { Permission } from './../enum/permission.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './../../../feature/user/interface/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  public async getUserInfo(): Promise<any>{
    const token = this.cookieService.get('access_token');
    if (token){
        if (this.currentUser$.getValue() === null){
          let user: IUser = JSON.parse(sessionStorage.getItem('user'));
          if (!user) {
            user = await this.httpClient.get(APIEndpoint + `/auth/get_user?token=${token}`).toPromise() as IUser;
            sessionStorage.setItem('user', JSON.stringify(user));
          }
          this.currentUser$.next((user as IUser));
        }
    } else {
      this.clearUserInfo();
    }
  }

  public clearUserInfo(){
      this.currentUser$.next(null);
      sessionStorage.removeItem('user');
  }

  public hasPermissions(permissions: Permission[]): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => {
        let permissionFound = false;
        user.permissions.forEach(userPermission => {
          if (permissions.findIndex(permission => permission === userPermission) !== -1 ) { permissionFound = true; }
        });
        return permissionFound;
      })
    );

  }
}
