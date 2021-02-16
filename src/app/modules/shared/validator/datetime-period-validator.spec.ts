import { datetimePeriodValidator } from 'src/app/modules/shared/validator/datetime-period-validator';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

describe('datetimePeriodValidator', () => {
  const datetimePeriodValidatorFn = datetimePeriodValidator();

  it('should return null if validFrom date before validTo', () => {
    const periodGroupMock = new FormGroup({
      dateFrom: new FormControl(new NgbDate(2021, 0, 1)),
      timeFrom: new FormControl({hour: 11, minute: 25, second: 50}),
      dateTo: new FormControl(new NgbDate(2021, 0, 1)),
      timeTo: new FormControl({hour: 13, minute: 10, second: 20})
    });
    expect(datetimePeriodValidatorFn(periodGroupMock)).toEqual(null);
  });

  it('should return {period: true} if values are null or validFrom date after or equal validTo', () => {
    let periodGroupMock = new FormGroup({
      dateFrom: new FormControl(new NgbDate(2021, 0, 1)),
      timeFrom: new FormControl({hour: 14, minute: 0, second: 50}),
      dateTo: new FormControl(new NgbDate(2021, 0, 1)),
      timeTo: new FormControl({hour: 13, minute: 10, second: 20})
    });
    expect(datetimePeriodValidatorFn(periodGroupMock)).toEqual({period: true});

    periodGroupMock = new FormGroup({
      dateFrom: new FormControl(new NgbDate(2021, 0, 1)),
      timeFrom: new FormControl({hour: 11, minute: 25, second: 50}),
      dateTo: new FormControl(new NgbDate(2021, 0, 1)),
      timeTo: new FormControl({hour: 11, minute: 25, second: 50})
    });
    expect(datetimePeriodValidatorFn(periodGroupMock)).toEqual({period: true});

    periodGroupMock = new FormGroup({
      dateFrom: new FormControl(),
      timeFrom: new FormControl(),
      dateTo: new FormControl(),
      timeTo: new FormControl()
    });
    expect(datetimePeriodValidatorFn(periodGroupMock)).toEqual({period: true});
  });
});
