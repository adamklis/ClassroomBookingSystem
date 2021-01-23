import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeAdapter extends NgbTimeAdapter<Date> {

  fromModel(value: Date | null): NgbTimeStruct | null {
    if (value) {
      return {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds()
      };
    }
    return null;
  }

  toModel(date: NgbTimeStruct | null): Date | null {
    if (date) {
      return new Date(1970, 0, 1, date.hour, date.minute, date.second);
    }
    return null;
  }

}
