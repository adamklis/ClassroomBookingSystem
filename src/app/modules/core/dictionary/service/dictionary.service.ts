import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDictionary } from '../interface/dictionary.interface';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private httpClient: HttpClient) { }

  public getDictionary(key: string): Observable<IDictionary> {
    return this.httpClient.get(`${APIEndpoint}/dictionary/${key}`) as Observable<IDictionary>;
  }
}
