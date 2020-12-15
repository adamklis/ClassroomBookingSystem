import { IUse } from './../../room/interface/use.interface';
import { IObjectreference } from './../../../shared/interface/object-reference.interface';

export interface IAppliance {
  uuid?: string;
  name: string;
  quantity: number;
}

export interface IApplianceUse extends IUse {
  appliance: IObjectreference;
}
