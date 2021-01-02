import { AuthorizationService } from './../../authorization/service/authorization.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private authorizationService: AuthorizationService
  ) { }

  public async login(clientId: string, clientSecret: string): Promise<any>{
    await this.retrieveToken(clientId, clientSecret);
    return await this.authorizationService.getUserInfo();
  }

  public async logout(){
    const token = this.cookieService.get('access_token');
    await this.httpClient.post(APIEndpoint + `/auth/logout?token=${token}`, '').toPromise();
    this.cookieService.delete('access_token', '/');
    this.authorizationService.clearUserInfo();
  }

  public checkCredentials(): boolean {
    return this.cookieService.check('access_token');
  }

  private async retrieveToken(clientId: string, clientSecret: string): Promise<any> {
    const token = await this.httpClient
      .post(
        APIEndpoint + '/auth/get_token',
        this.getRetriveTokenBody(clientId, clientSecret),
        { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
      )
      .toPromise();
    this.saveToken(token);
  }

  private saveToken(token: any){
    this.cookieService.set('access_token', token.access_token, {expires: 1, path: '/' });
  }

  private getRetriveTokenBody(clientId: string, clientSecret: string): string {
    return `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=login`;
  }

}
