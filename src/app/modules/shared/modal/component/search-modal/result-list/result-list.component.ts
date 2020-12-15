import { IUse } from 'src/app/modules/feature/room/interface/use.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;

  @Input()
  public uses: IUse[];

  @Output()
  public quantityChanged: EventEmitter<IUse> = new EventEmitter<IUse>();

  constructor() { }

  ngOnInit(): void {
  }

  public onQuantityChange(use: IUse){
    this.quantityChanged.emit(use);
  }

  public trimDecimal($event: any, max?: number){
    const value = $event.target.value;
    if (!!value){
      if (value > max){
        $event.target.value = max;
      } else {
        $event.target.value = Math.floor(value);
      }
    }
  }

}
