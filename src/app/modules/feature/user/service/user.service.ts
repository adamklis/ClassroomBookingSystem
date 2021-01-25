import { IUser } from './../interface/user.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(filter?: IFilter[], sort?: ISort[]): Observable<IUser[]> {
    return this.httpClient.get(
      APIEndpoint + '/user?' + Filter.getQueryString(filter) + Sort.getQueryString(sort)
    ) as Observable<IUser[]>;
  }

  public getUser(uuid: string): Observable<IUser> {
    return this.httpClient.get(`${APIEndpoint}/user/${uuid}`) as Observable<IUser>;
  }

  public addUser(user: IUser): Promise<any> {
    return this.httpClient.post(APIEndpoint + '/user', user).toPromise();
  }

  public saveUser(user: IUser): Promise<any> {
    return this.httpClient.put(`${APIEndpoint}/user/${user.uuid}`, user).toPromise();
  }

  public deleteUser(uuid: string): Promise<any> {
    return this.httpClient.delete(`${APIEndpoint}/user/${uuid}`).toPromise();
  }

  public saveUserPermissions(uuid: string, permissions: Permission[]) {
    return this.httpClient.put(`${APIEndpoint}/user/${uuid}/permissions`, permissions).toPromise();
  }
}
