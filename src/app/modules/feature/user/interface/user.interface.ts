export interface IUser {
  uuid?: string;
  forename: string;
  surename: string;
  contact: string;
  role: string;
  email: string;
  login: string;
}

export interface IUserRef {
  uuid?: string;
  name: string;
}
