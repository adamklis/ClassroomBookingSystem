import { DictionaryService } from './dictionary.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { IDictionary } from '../interface/dictionary.interface';

@Injectable({
  providedIn: 'root'
})
export class DictionaryResolver implements Resolve<IDictionary[]> {

  constructor(private dictionaryService: DictionaryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDictionary[]> {
    const keys: string[] = route.data.keys;
    if (keys && keys.length > 0) {
      return forkJoin(
        keys.map(key => this.dictionaryService.getDictionary(key))
      );
    }
  }

}
