import { SortOrder } from '../enum/sort-order.enum';
import { Sort } from './sort';

describe('sort', () => {
  it('should return sorting query part of url', () => {
    expect(Sort.getQueryString(null)).toEqual('');
    expect(Sort.getQueryString({key: 'aaa', order: SortOrder.ASCEND})).toEqual('sort_aaa=asc&');
    expect(Sort.getQueryString([{key: 'bbb', order: SortOrder.ASCEND}, {key: 'ccc', order: SortOrder.DESCEND}])).toEqual('sort_bbb=asc&sort_ccc=desc&');
    expect(Sort.getQueryString([])).toEqual('');
  });
});
