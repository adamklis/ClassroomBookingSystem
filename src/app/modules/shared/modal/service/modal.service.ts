import { Observable } from 'rxjs';
import { SearchModalComponent } from './../component/search-modal/search-modal.component';
import { IModalBody } from './../interface/modal-body';
import { ButtonType } from '../enum/button-type.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '../component/base-modal/base-modal.component';
import { Injectable } from '@angular/core';
import { IUse } from 'src/app/modules/feature/room/interface/use.interface';
import { IFilter } from '../../interface/filter.interface';
import { ISort } from '../../interface/sort.interface';
import { IPageable } from '../../interface/pageable.interface';
import { IPage } from '../../interface/page.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  public showSearchModal(
    searchFunction: (filter?: IFilter[], sort?: ISort[], page?: IPage) => Observable<IPageable<IUse>>,
    uses?: IUse[],
    searchText?: string
  ){
    const modal = this.ngbModal.open(SearchModalComponent);
    modal.componentInstance.title = 'Search';
    modal.componentInstance.buttons = [ButtonType.DISMISS, ButtonType.CONFIRM];
    modal.componentInstance.uses = uses ? uses : [];
    modal.componentInstance.searchText = searchText ? searchText : '';
    modal.componentInstance.searchFunction = searchFunction;
    return modal.result;
  }

  public showDeleteModal(modalBody: IModalBody): Promise<any> {
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
