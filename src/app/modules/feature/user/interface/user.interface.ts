export interface IUser {
  uuid?: string;
  forename: string;
  surname: string;
  contact: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRef {
  uuid?: string;
  name: string;
}
