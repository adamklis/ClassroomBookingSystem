import { AuthenticationService } from './../../authentication/service/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './../../../feature/user/interface/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
      if (this.currentUser$.getValue() === null ){
        const result = await this.httpClient
          .get(APIEndpoint + `/auth/get_user?token=${token}`).toPromise();
        this.currentUser$.next(result as IUser);
      }
    } else {
      this.currentUser$.next(null);
    }
  }

  public clearUserInfo(){
    if (this.currentUser$.value !== null){
      this.currentUser$.next(null);
    }
  }
}
