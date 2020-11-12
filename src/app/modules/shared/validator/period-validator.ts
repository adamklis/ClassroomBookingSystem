import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorFn, FormGroup } from '@angular/forms';

export function periodValidator(): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} | null => {
      const validFrom = group.get('validFrom');
      const validTo = group.get('validTo');

      return validFrom && validTo && compare(validFrom.value, validTo.value) < 0 ? { period: true } : null;
    };
  }

function compare(date1: NgbDateStruct, date2: NgbDateStruct): number {

  if (date1 && date2){

    const timestamp1 = date1.day + 31 * date1.month + 31 * 12 * date1.year;
    const timestamp2 = date2.day + 31 * date2.month + 31 * 12 * date2.year;

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
