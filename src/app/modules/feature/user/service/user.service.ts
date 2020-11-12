import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as uuidGen from 'uuid';
import { IUser } from '../interface/user.interface';

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
      login: 'aklis'
    },
    {
      uuid: '2',
      forename: 'Jan',
      surename: 'Kowalski',
      contact: '123456789',
      role: 'student',
      email: 'klisiu94@onet.eu',
      login: 'jkowa'
    },
    {
      uuid: '3',
      forename: 'Mateusz',
      surename: 'Nowak',
      contact: '987654321',
      role: 'tech',
      email: 'nowakmateusz@interia.pl',
      login: 'mnowa'
    }
  ];

  constructor() { }

  public getUsers(): Observable<IUser[]> {
    return of(this.USERS);
  }

  public getUser(uuid: string): Observable<IUser> {
    return of(this.USERS.find(user => user.uuid === uuid));
  }

  public addUser(user: IUser): void {
    user.uuid = uuidGen.v4();
    console.log('Add user:');
    console.log(user);
    this.USERS.push(user);
  }

  public saveUser(user: IUser): void {
    console.log('Save user:');
    console.log(user);
    const userIndex = this.USERS.findIndex(oldUser => oldUser.uuid === user.uuid);
    this.USERS[userIndex] = user;
  }

  public deleteUser(uuid: string): void {
    console.log('Delete user:');
    console.log(uuid);
    this.USERS = this.USERS.filter(user => user.uuid !== uuid);
  }
}
