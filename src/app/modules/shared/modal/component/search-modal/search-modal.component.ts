import { SortOrder } from './../../../enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { ISort } from './../../../interface/sort.interface';
import { IFilter } from './../../../interface/filter.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { IUse } from 'src/app/modules/feature/room/interface/use.interface';
import { ButtonType } from '../../enum/button-type.enum';
import * as uuidGen from 'uuid';
import { IPageable } from '../../../interface/pageable.interface';
import { Page } from '../../../model/page';
import { IPage } from '../../../interface/page.interface';
import { Sort } from '../../../model/sort';

@Component({
  selector: 'cbs-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  buttonTypes = ButtonType;

  public title = '';
  public buttons: ButtonType[] = [];
  public uses: IUse[];
  public searchText: string;
  public searchFunction: (filter?: IFilter[], sort?: ISort[], page?: IPage) => Observable<IPageable<IUse>>;

  public currentPageNumber: number;
  public currentPage: Page;

  public searchBusy = false;
  public displayedUses: IUse[] = [];
  public changedUses: IUse[] = [];
  private searchSubscription: Subscription;


  constructor(public activeModal: NgbActiveModal) {
    this.currentPage = new Page(5, 0, 0);
    this.currentPageNumber = this.currentPage.getPageNumber();
  }

  ngOnInit(): void {
    this.searchBusy = true;
    this.searchSubscription = this.searchFunction(
      [new Filter('uuid', this.searchText)],
      [new Sort('name', SortOrder.ASCEND)],
      this.currentPage.getPage(this.currentPageNumber)
    ).subscribe(usesFound => {
      this.mergeUses(this.uses, usesFound.results, false);
      this.mergeUses(this.changedUses, usesFound.results, false);
      this.displayedUses = usesFound.results;
      this.currentPage = new Page(usesFound.page.limit, usesFound.page.size, usesFound.page.start);
      this.currentPageNumber = this.currentPage.getPageNumber();
      this.searchBusy = false;
    });
  }

  public isButtonTypeSelected(buttonType: ButtonType): boolean {
    return this.buttons.findIndex(button => button === buttonType) !== -1;
  }

  public inputChanged(inputText: string){
    this.searchBusy = true;
    this.searchText = inputText;
    if (this.searchSubscription) { this.searchSubscription.unsubscribe(); }
    this.searchSubscription = this.searchFunction(
      [new Filter('name', this.searchText)],
      [new Sort('name', SortOrder.ASCEND)],
      this.currentPage.getPage(this.currentPageNumber)
    ).subscribe(usesFound => {
      this.mergeUses(this.uses, usesFound.results, false);
      this.mergeUses(this.changedUses, usesFound.results, false);
      this.displayedUses = usesFound.results;
      this.currentPage = new Page(usesFound.page.limit, usesFound.page.size, usesFound.page.start);
      this.currentPageNumber = this.currentPage.getPageNumber();
      this.searchBusy = false;
    });

  }

  public quantityChanged(changedUse: IUse){
    const useFound = this.changedUses.find(use => use.uuid === changedUse.uuid);
    if (useFound) {
      useFound.quantity = changedUse.quantity;
    } else {
      this.changedUses.push(changedUse);
    }
  }

  public closeAction(action: ButtonType){
    switch (action) {
      case ButtonType.CONFIRM: {
        this.mergeUses(this.changedUses, this.uses);
        this.activeModal.close(this.uses.filter(use => use.quantity > 0));
        break;
      }
      case ButtonType.DISMISS:
      case ButtonType.OK:
      case ButtonType.DELETE:
      default: this.activeModal.dismiss(action);
    }
  }

  private mergeUses(sourceUses: IUse[], destinationUses: IUse[], addNonExist = true) {
    sourceUses.forEach(sourceUse => {
      const foundUse = destinationUses.find(use => use.uuid === sourceUse.uuid);
      if (foundUse) {
        foundUse.quantity = sourceUse.quantity;
      } else {
        if (addNonExist){
          sourceUse.useUuid = uuidGen.v4();
          destinationUses.push(sourceUse);
        }
      }
    });
  }

}
