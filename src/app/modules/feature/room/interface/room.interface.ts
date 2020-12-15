import { ISoftwareUse } from './../../software/interface/software.interface';
import { IApplianceUse } from './../../appliance/interface/appliance.interface';

export interface IRoom {
  uuid?: string;
  name: string;
  numberOfSeats: number;
  appliances?: IApplianceUse[];
  software?: ISoftwareUse[];
}

export interface IRoomRef {
  uuid?: string;
  name: string;
}
