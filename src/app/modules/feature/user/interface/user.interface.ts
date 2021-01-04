import { Permission } from './../../../core/authorization/enum/permission.enum';
export interface IUser {
  uuid?: string;
  forename: string;
  surname: string;
  contact: string;
  email: string;
  password: string;
  permissions: Permission[];
}

export interface IUserRef {
  uuid?: string;
  name: string;
}
