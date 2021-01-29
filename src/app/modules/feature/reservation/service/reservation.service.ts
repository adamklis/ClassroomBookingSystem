import { IReservation } from './../interface/reservation.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { map } from 'rxjs/operators';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  public getReservations(filter?: IFilter[], sort?: ISort[]): Observable<IReservation[]>{
    return this.httpClient
      .get(APIEndpoint + '/reservation?' + Filter.getQueryString(filter) + Sort.getQueryString(sort)) as Observable<IReservation[]>;
  }

  public getReservation(uuid: string): Observable<IReservation>{
    return this.httpClient.get(`${APIEndpoint}/reservation/${uuid}`).pipe(
      map((item: IReservation) => {
        return {
          uuid: item.uuid,
          user: item.user,
          room: item.room,
          dateFrom: new Date(item.dateFrom),
          dateTo: new Date(item.dateTo),
          message: item.message
        };
      })
    );
  }

  public addReservation(reservation: IReservation): Promise<any> {
    return this.httpClient.post(APIEndpoint + '/reservation', reservation).toPromise();
  }

  public saveReservation(reservation: IReservation): Promise<any> {
    return this.httpClient.put(`${APIEndpoint}/reservation/${reservation.uuid}`, reservation).toPromise();
  }

  public deleteReservation(uuid: string): Promise<any> {
    return this.httpClient.delete(`${APIEndpoint}/reservation/${uuid}`).toPromise();
  }

}
