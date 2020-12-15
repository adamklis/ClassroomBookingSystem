import { ISort } from './../../../interface/sort.interface';
import { IFilter } from './../../../interface/filter.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { IUse } from 'src/app/modules/feature/room/interface/use.interface';
import { ButtonType } from '../../enum/button-type.enum';
import * as uuidGen from 'uuid';

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
  public searchFunction: (filter?: IFilter[], sort?: ISort[]) => Observable<IUse[]>;

  public searchBusy = false;
  public displayedUses: IUse[] = [];
  public changedUses: IUse[] = [];
  private searchSubscription: Subscription;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.searchBusy = true;
    this.searchSubscription = this.searchFunction([{key: 'uuid', value: this.searchText}]).subscribe(usesFound => {
      this.mergeUses(this.uses, usesFound, false);
      this.mergeUses(this.changedUses, usesFound, false);
      this.displayedUses = usesFound;
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
    this.searchSubscription = this.searchFunction([{key: 'name', value: this.searchText}]).subscribe(usesFound => {
      this.mergeUses(this.uses, usesFound, false);
      this.mergeUses(this.changedUses, usesFound, false);
      this.displayedUses = usesFound;
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
