import { IUser } from './../interface/user.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get(APIEndpoint + '/user') as Observable<IUser[]>;
  }

  public getUser(uuid: string): Observable<IUser> {
    return this.httpClient.get(`${APIEndpoint}/user/${uuid}`) as Observable<IUser>;
  }

  public addUser(user: IUser): Promise<any> {
    console.log('Add user:');
    console.log(user);
    return this.httpClient.post(APIEndpoint + '/user', user).toPromise();
  }

  public saveUser(user: IUser): Promise<any> {
    console.log('Save user:');
    console.log(user);
    return this.httpClient.put(`${APIEndpoint}/user/${user.uuid}`, user).toPromise();
  }

  public deleteUser(uuid: string): Promise<any> {
    console.log('Delete user:');
    console.log(uuid);
    return this.httpClient.delete(`${APIEndpoint}/user/${uuid}`).toPromise();
  }
}
