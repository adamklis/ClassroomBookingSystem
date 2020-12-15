import { IFilter } from './../interface/filter.interface';
export class Filter implements IFilter {

  constructor(public key: string, public value: string){}

  public static getQueryString(filter: IFilter | IFilter[] | null): string {

    if (!filter) {
      return '';
    }

    if (Array.isArray(filter)) {
      return filter.reduce((result, next) => {
        return result.concat('filter_', next.key, '=', next.value, '&');
      }, '').slice(0, -1);
    } else {
      return ''.concat('filter_', filter.key, '=', filter.value);
    }
  }
}
