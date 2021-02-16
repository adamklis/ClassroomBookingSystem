import { Page } from './page';

describe('page', () => {

  it('should return valid page number', () => {
    expect(new Page(10, 100, 0).getPageNumber()).toEqual(1);
    expect(new Page(10, 100, 50).getPageNumber()).toEqual(6);
  });

  it('should return valid page object', () => {
    expect(new Page(10, 100, 0).getPage(5)).toEqual(new Page(10, 100, 40));
    expect(new Page(10, 100, 0).getPage(1)).toEqual(new Page(10, 100, 0));
    expect(new Page(5, 55, 0).getPage()).toEqual(new Page(5, 55, 0));
  });

  it('should return query part of url', () => {
    expect(Page.getQueryString(null)).toEqual('');
    expect(Page.getQueryString({limit: 5, size: 100, start: 0})).toEqual('limit=5&offset=0&');
    expect(Page.getQueryString({limit: 20, size: 100, start: 40})).toEqual('limit=20&offset=40&');
  });
});

