import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from './../../feature/user/interface/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  public login(clientId: string, clientSecret: string): Promise<any>{
    return this.retrieveToken(clientId, clientSecret);
  }

  public logout(){
    this.cookieService.delete('access_token', '/');
    this.user = null;
    console.log('logout...');
    // TODO logout request
  }

  public checkCredentials(): boolean {
    return this.cookieService.check('access_token') && !!this.user;
  }

  public getCurrentUser(): BehaviorSubject<IUser>{
    return this.user;
  }

  private retrieveToken(clientId: string, clientSecret: string): Promise<any> {
    return this.httpClient
      .post(
        APIEndpoint + '/auth/get_token',
        this.getRetriveTokenBody(clientId, clientSecret),
        { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
      )
      .toPromise()
      .then((token) => {
        this.saveToken(token);

        this.httpClient.get(APIEndpoint + '/auth/get_user?token=' + this.cookieService.get('access_token')).toPromise()
        .then(
          user => this.user.next(user)
        );
      });
  }

  private saveToken(token: any){
    this.cookieService.set('access_token', token.access_token, {expires: 1, path: '/' });
  }

  private getRetriveTokenBody(clientId: string, clientSecret: string): string {
    return `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=login`;
  }

}
