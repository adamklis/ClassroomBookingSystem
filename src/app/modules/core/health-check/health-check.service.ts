import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, timeout } from 'rxjs/operators';


const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  constructor(private httpClient: HttpClient) { }

  private $backendState = new BehaviorSubject<boolean>(false);

  public get status(): Observable<boolean> {
    return this.$backendState.asObservable();
  }

  public checkBackend(): Promise<any> {
    this.httpClient.get(APIEndpoint + '/health').toPromise()
      .then(() => this.$backendState.next(true) )
      .catch(() => this.$backendState.next(false) );
    setInterval(() => this.httpClient.get(APIEndpoint + '/health').toPromise()
      .then(() => this.$backendState.next(true) )
      .catch(() => this.$backendState.next(false) )
    , 300000);

    return Promise.resolve(this.$backendState.value);
  }
}
