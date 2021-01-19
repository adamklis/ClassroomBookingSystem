import { IAppliance, IApplianceUse } from './../interface/appliance.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  constructor(private httpClient: HttpClient) { }

  public getApplianceUseList(filter?: IFilter[], sort?: ISort[]): Observable<IApplianceUse[]> {
    return this.httpClient
      .get(APIEndpoint + '/appliance/use?' + Filter.getQueryString(filter) + Sort.getQueryString(sort)) as Observable<IApplianceUse[]>;
  }

  public getAppliances(filter?: IFilter[], sort?: ISort[]): Observable<IAppliance[]> {
    return this.httpClient.get(
      APIEndpoint + '/appliance?' + Filter.getQueryString(filter) + Sort.getQueryString(sort)
    ) as Observable<IAppliance[]>;
  }

  public getAppliance(uuid: string): Observable<IAppliance> {
    return this.httpClient.get(`${APIEndpoint}/appliance/${uuid}`).pipe(
      map((item: IAppliance) => {
        return {
          uuid: item.uuid,
          name: item.name,
          quantity: item.quantity
        };
      })
    );
  }

  public addAppliance(appliance: IAppliance): Promise<any> {
    return this.httpClient.post(APIEndpoint + '/appliance', appliance).toPromise();
  }

  public saveAppliance(appliance: IAppliance): Promise<any> {
    return this.httpClient.put(`${APIEndpoint}/appliance/${appliance.uuid}`, appliance).toPromise();
  }

  public deleteAppliance(uuid: string): Promise<any> {
    return this.httpClient.delete(`${APIEndpoint}/appliance/${uuid}`).toPromise();
  }
}
