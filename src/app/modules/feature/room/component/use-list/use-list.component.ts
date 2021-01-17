import { Observable } from 'rxjs';
import { ModalService } from './../../../../shared/modal/service/modal.service';
import { IUse } from './../../interface/use.interface';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { faPlus, faMinus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cbs-use-list',
  templateUrl: './use-list.component.html',
  styleUrls: ['./use-list.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UseListComponent), multi: true }]
})
export class UseListComponent implements OnInit, ControlValueAccessor {

  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faPen = faPen;

  @Input()
  public disabled: boolean;

  public get isDisabled(): boolean {
    return this.disabled;
  }


  @Input()
  public uses: IUse[];

  @Input()
  public searchFunction: (filter?: IFilter[], sort?: ISort[]) => Observable<IUse[]>;

  @Output()
  public usesChange: EventEmitter<IUse[]> = new EventEmitter<IUse[]>();

  constructor(private modalService: ModalService) { }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

  }

  ngOnInit(): void {
  }

  onAdd(): void {
      this.modalService.showSearchModal(this.searchFunction, this.uses)
      .then((result) => {
        this.uses = result;
        this.usesChange.emit(this.uses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onEdit(uuid: string): void {
    this.modalService.showSearchModal(this.searchFunction, this.uses, uuid)
    .then((result) => {
      this.uses = result;
      this.usesChange.emit(this.uses);
    })
    .catch(error => {
      console.log(error);
    });
  }

  onRemove(useUuid: string): void {
    const index = this.uses.findIndex(use => use.useUuid === useUuid);
    if (index > -1){
      this.uses.splice(index, 1);
    }
    this.usesChange.emit(this.uses);
  }

}
