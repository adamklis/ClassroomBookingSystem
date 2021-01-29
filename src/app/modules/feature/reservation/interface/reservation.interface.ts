import { IRoom } from '../../room/interface/room.interface';
import { IUser } from '../../user/interface/user.interface';

export interface IReservation {
  uuid?: string;
  user: IUser;
  room: IRoom;
  dateFrom: Date;
  dateTo: Date;
  message: string;
}
