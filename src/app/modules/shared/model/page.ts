import { IPage } from './../interface/page.interface';
export class Page implements IPage {

  constructor(public limit: number, public size: number, public start: number){}

  public static getQueryString(page: IPage| null): string {
    if (!page) {
      return '';
    }
    return ''.concat('limit=', page.limit.toString(), '&offset=', page.start.toString(), '&');
  }

  public getPageNumber(): number {
    return Math.floor(this.start / this.limit) + 1;
  }

  public getPage(pageNumber?: number): Page{
    if (pageNumber) {
      return new Page(this.limit, this.size, this.limit * (pageNumber - 1));
    }
    return this;
  }

}
