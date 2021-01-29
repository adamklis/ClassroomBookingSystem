import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorFn, FormGroup } from '@angular/forms';

export function datetimePeriodValidator(): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} | null => {
      const dateFrom = group.get('dateFrom');
      const timeFrom = group.get('timeFrom');
      const dateTo = group.get('dateTo');
      const timeTo = group.get('timeTo');

      return dateFrom && timeFrom && dateTo && timeTo &&
      compare(dateFrom.value, timeFrom.value, dateTo.value, timeTo.value) <= 0 ? { period: true } : null;
    };
  }

function compare(date1: NgbDateStruct, time1: NgbTimeStruct, date2: NgbDateStruct, time2: NgbTimeStruct): number {

  if (date1 && date2 && time1 && time2){

    const timestamp1 = time1.minute + 60 * time1.hour + 60 * 24 * date1.day + 60 * 24 * 31 * date1.month + 60 * 24 * 31 * 12 * date1.year;
    const timestamp2 = time2.minute + 60 * time2.hour + 60 * 24 * date2.day + 60 * 24 * 31 * date2.month + 60 * 24 * 31 * 12 * date2.year;

    if (timestamp1 > timestamp2) {
      return -1;
    } else if (timestamp1 < timestamp2) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
