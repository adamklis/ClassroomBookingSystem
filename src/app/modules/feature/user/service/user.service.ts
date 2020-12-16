import { IUser } from './../interface/user.interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as uuidGen from 'uuid';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS: Array<IUser> = [
    {
      uuid: '1',
      forename: 'Adam',
      surename: 'Kliś',
      contact: '691202553',
      role: 'admin',
      email: 'klis.adam.0807@gmail.com',
      password: 'aklis'
    },
    {
      uuid: '2',
      forename: 'Jan',
      surename: 'Kowalski',
      contact: '123456789',
      role: 'student',
      email: 'klisiu94@onet.eu',
      password: 'jkowa'
    },
    {
      uuid: '3',
      forename: 'Mateusz',
      surename: 'Nowak',
      contact: '987654321',
      role: 'tech',
      email: 'nowakmateusz@interia.pl',
      password: 'mnowa'
    }
  ];

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
