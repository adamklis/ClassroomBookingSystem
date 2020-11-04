import { IModalBody } from './../interface/modal-body';
import { ButtonType } from '../enum/button-type.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '../component/base-modal/base-modal.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  public showDeleteModal(modalBody: IModalBody): Promise<any> {
    console.log('modalBody');
    console.log(modalBody);
    return this.show({
      title: modalBody.title ? modalBody.title : '',
      message: modalBody.message ? modalBody.message : '',
      buttons: modalBody.buttons ? modalBody.buttons : [ButtonType.DISMISS, ButtonType.DELETE]
    });
  }

  public showInfoModal(modalBody: IModalBody): Promise<any> {
    return this.show({
      title: modalBody.title ? modalBody.title : '',
      message: modalBody.message ? modalBody.message : '',
      buttons: modalBody.buttons ? modalBody.buttons : [ButtonType.OK]
    }).catch(error => {});
  }

  public showConfirmModal(modalBody: IModalBody): Promise<any> {
    return this.show({
      title: modalBody.title ? modalBody.title : '',
      message: modalBody.message ? modalBody.message : '',
      buttons: modalBody.buttons ? modalBody.buttons :  [ButtonType.DISMISS, ButtonType.CONFIRM]
    });
  }

  private show(modalBody: IModalBody): Promise<any> {
    const modal = this.ngbModal.open(BaseModalComponent);
    modal.componentInstance.title = modalBody.title;
    modal.componentInstance.message = modalBody.message;
    modal.componentInstance.buttons = modalBody.buttons;
    return modal.result;
  }
}
