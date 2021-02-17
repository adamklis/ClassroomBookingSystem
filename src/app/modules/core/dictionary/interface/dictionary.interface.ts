import { IDictionaryItem } from './dictionary-item.interface';
export interface IDictionary {
  key: string;
  items: IDictionaryItem[];
}
