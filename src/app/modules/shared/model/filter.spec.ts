import { Filter } from './filter';

describe('filter', () => {
  it('should return filter query part of url', () => {
    expect(Filter.getQueryString(null)).toEqual('');
    expect(Filter.getQueryString({key: 'aaa', value: 'xxx'})).toEqual('filter_aaa=xxx&');
    expect(Filter.getQueryString([{key: 'bbb', value: 'yyy'}, {key: 'ccc', value: 'zzz'}])).toEqual('filter_bbb=yyy&filter_ccc=zzz&');
    expect(Filter.getQueryString([])).toEqual('');
  });
});
