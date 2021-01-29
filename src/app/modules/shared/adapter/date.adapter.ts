import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateAdapter extends NgbDateAdapter<Date> {

  fromModel(value: Date | null): NgbDateStruct | null {
    if (value) {
      return {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate()
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): Date | null {
    if (date) {
      return new Date(date.year, date.month - 1, date.day);
    }
    return null;
  }

}
