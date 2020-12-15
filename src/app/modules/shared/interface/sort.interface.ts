import { SortOrder } from '../enum/sort-order.enum';

export interface ISort {
  key: string;
  value: string;
  order: SortOrder;
}
