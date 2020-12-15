import { SortOrder } from './../enum/sort-order.enum';
import { ISort } from './../interface/sort.interface';

export class Sort implements ISort {

  constructor(public key: string, public value: string, public order: SortOrder){}

  public static getQueryString(sort: ISort | ISort[] | null): string {

    if (!sort) {
      return '';
    }

    if (Array.isArray(sort)) {
      return sort.reduce((result, next) => {
        return result.concat('sort_', next.key, '_', next.order, '=', next.value, '&');
      }, '').slice(0, -1);
    } else {
      return ''.concat('sort_', sort.key, '_', sort.order, '=', sort.value);
    }
  }
}
