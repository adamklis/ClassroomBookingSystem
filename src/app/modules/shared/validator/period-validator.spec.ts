import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { periodValidator } from 'src/app/modules/shared/validator/period-validator';

describe('periodValidator', () => {
  const periodValidatorFn = periodValidator();

  it('should return null if validFrom date before validTo', () => {
    const periodGroupMock = new FormGroup({
      validFrom: new FormControl(new NgbDate(2021, 1, 1)),
      validTo: new FormControl(new NgbDate(2021, 1, 2)),
    });
    expect(periodValidatorFn(periodGroupMock)).toEqual(null);
  });

  it('should return {period: true} if validFrom date after or equal validTo', () => {
    const periodGroupMock = new FormGroup({
      validFrom: new FormControl(new NgbDate(2021, 1, 2)),
      validTo: new FormControl(new NgbDate(2021, 1, 1)),
    });
    expect(periodValidatorFn(periodGroupMock)).toEqual({period: true});
  });

  it('should return null if equal or null value', () => {
    let periodGroupMock = new FormGroup({
      validFrom: new FormControl(new NgbDate(2021, 1, 1)),
      validTo: new FormControl(new NgbDate(2021, 1, 1)),
    });
    expect(periodValidatorFn(periodGroupMock)).toEqual(null);

    periodGroupMock = new FormGroup({
      validFrom: new FormControl(),
      validTo: new FormControl(),
    });
    expect(periodValidatorFn(periodGroupMock)).toEqual(null);
  });
});
