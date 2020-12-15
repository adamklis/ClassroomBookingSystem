import { IObjectreference } from './../../../shared/interface/object-reference.interface';
import { IUse } from './../../room/interface/use.interface';

export interface ISoftware {
  uuid?: string;
  name: string;
  quantity: number;
  validFrom?: Date;
  validTo?: Date;
}

export interface ISoftwareUse extends IUse {
  software: IObjectreference;
}
