import { IDictionaryItemValue } from './dictionary-item-value.interface';
export interface IDictionaryItem {
  sn: number;
  key: string;
  values: IDictionaryItemValue[];
}
