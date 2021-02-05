import { Sort } from './../../../shared/model/sort';
import { Filter } from './../../../shared/model/filter';
import { ISort } from './../../../shared/interface/sort.interface';
import { IFilter } from './../../../shared/interface/filter.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ISoftware, ISoftwareUse } from './../interface/software.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPage } from 'src/app/modules/shared/interface/page.interface';
import { IPageable } from 'src/app/modules/shared/interface/pageable.interface';
import { Page } from 'src/app/modules/shared/model/page';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private httpClient: HttpClient) { }

  public getSoftwareUseList(filter?: IFilter[], sort?: ISort[], page?: IPage): Observable<IPageable<ISoftwareUse>> {
    return this.httpClient.get(
      APIEndpoint + '/software/use?' + Filter.getQueryString(filter) + Sort.getQueryString(sort) + Page.getQueryString(page)
    ) as Observable<IPageable<ISoftwareUse>>;
  }

  public getSoftwareList(filter?: IFilter[], sort?: ISort[], page?: IPage): Observable<IPageable<ISoftware>> {
    return this.httpClient.get(
      APIEndpoint + '/software?' + Filter.getQueryString(filter) + Sort.getQueryString(sort) + Page.getQueryString(page)
    ) as Observable<IPageable<ISoftware>>;
  }

  public getSoftware(uuid: string): Observable<ISoftware> {
    return this.httpClient.get(`${APIEndpoint}/software/${uuid}`).pipe(
      map((item: ISoftware) => {
        return {
          uuid: item.uuid,
          name: item.name,
          quantity: item.quantity,
          validFrom: item.validFrom ? new Date(item.validFrom) : null,
          validTo: item.validTo ? new Date(item.validTo) : null
        };
      })
    );
  }

  public addSoftware(software: ISoftware): Promise<any> {
    return this.httpClient.post(APIEndpoint + '/software', software).toPromise();
  }

  public saveSoftware(software: ISoftware): Promise<any> {
    return this.httpClient.put(`${APIEndpoint}/software/${software.uuid}`, software).toPromise();
  }

  public deleteSoftware(uuid: string): Promise<any> {
    return this.httpClient.delete(`${APIEndpoint}/software/${uuid}`).toPromise();
  }
}
