import { IRoom } from './../interface/room.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  public getRooms(): Observable<IRoom[]> {
    return this.httpClient.get(APIEndpoint + '/room') as Observable<IRoom[]>;
  }

  public getRoom(uuid: string): Observable<IRoom> {
    return this.httpClient.get(`${APIEndpoint}/room/${uuid}`) as Observable<IRoom>;
  }

  public addRoom(room: IRoom): Promise<any> {
    console.log('Add room:');
    console.log(room);
    return this.httpClient.post(APIEndpoint + '/room', room).toPromise();
  }

  public saveRoom(room: IRoom): Promise<any> {
    console.log('Save room:');
    console.log(room);
    return this.httpClient.put(`${APIEndpoint}/room/${room.uuid}`, room).toPromise();
  }

  public deleteRoom(uuid: string): Promise<any> {
    console.log('Delete room:');
    console.log(uuid);
    return this.httpClient.delete(`${APIEndpoint}/room/${uuid}`).toPromise();
  }
}
