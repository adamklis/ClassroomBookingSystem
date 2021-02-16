import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter } from 'src/app/modules/shared/adapter/date.adapter';
describe('filter', () => {

  const dateAdapter = new DateAdapter();

  it('should return valid NgbDateStruct or null', () => {
    expect(dateAdapter.fromModel(new Date(2021, 0, 1))).toEqual({year: 2021, month: 1, day: 1});
    expect(dateAdapter.fromModel(new Date(2030, 11, 30))).toEqual({year: 2030, month: 12, day: 30});
    expect(dateAdapter.fromModel(null)).toEqual(null);
  });

  it('should return valid Date object or null', () => {
    expect(dateAdapter.toModel({year: 2021, month: 1, day: 1})).toEqual(new Date(2021, 0, 1));
    expect(dateAdapter.toModel({year: 2030, month: 12, day: 30})).toEqual(new Date(2030, 11, 30));
    expect(dateAdapter.toModel(null)).toEqual(null);
  });
});
