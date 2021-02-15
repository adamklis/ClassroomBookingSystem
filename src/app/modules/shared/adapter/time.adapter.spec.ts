import { TimeAdapter } from 'src/app/modules/shared/adapter/time.adapter';

describe('filter', () => {

  const timeAdapter = new TimeAdapter();

  it('should return valid NgbTimeStruct or null', () => {
    expect(timeAdapter.fromModel(new Date(2021, 0, 1, 11, 22, 33))).toEqual({hour: 11, minute: 22, second: 33});
    expect(timeAdapter.fromModel(null)).toEqual(null);
  });

  it('should return valid Date object or null', () => {
    expect(timeAdapter.toModel({hour: 11, minute: 22, second: 33})).toEqual(new Date(1970, 0, 1, 11, 22, 33));
    expect(timeAdapter.toModel(null)).toEqual(null);
  });
});
