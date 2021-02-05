import { IRoom } from './../interface/room.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Page } from 'src/app/modules/shared/model/page';
import { IPage } from 'src/app/modules/shared/interface/page.interface';
import { IPageable } from 'src/app/modules/shared/interface/pageable.interface';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  public getRooms(filter?: IFilter[], sort?: ISort[], page?: IPage): Observable<IPageable<IRoom>> {
    return this.httpClient.get(
      APIEndpoint + '/room?' + Filter.getQueryString(filter) + Sort.getQueryString(sort) + Page.getQueryString(page)
    ) as Observable<IPageable<IRoom>>;
  }

  public getRoom(uuid: string): Observable<IRoom> {
    return this.httpClient.get(`${APIEndpoint}/room/${uuid}`) as Observable<IRoom>;
  }

  public addRoom(room: IRoom): Promise<any> {
    return this.httpClient.post(APIEndpoint + '/room', room).toPromise();
  }

  public saveRoom(room: IRoom): Promise<any> {
    return this.httpClient.put(`${APIEndpoint}/room/${room.uuid}`, room).toPromise();
  }

  public deleteRoom(uuid: string): Promise<any> {
    return this.httpClient.delete(`${APIEndpoint}/room/${uuid}`).toPromise();
  }
}
