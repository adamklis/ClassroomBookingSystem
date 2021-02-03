import { IPage } from './page.interface';

export interface IPageable<T> {
  page: IPage;
  results: T[];
}
