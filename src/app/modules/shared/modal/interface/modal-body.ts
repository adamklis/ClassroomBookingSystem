import { ButtonType } from '../enum/button-type.enum';
export interface IModalBody {
  title?: string;
  message?: string;
  buttons?: ButtonType[];
}
