import { ITag } from './tag.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cbs-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  faTimes = faTimes;

  @Input()
  public tag: ITag;

  @Output()
  public removeEvent = new EventEmitter<ITag>();

  constructor() { }

  ngOnInit(): void {
  }

  public onRemove(){
    this.removeEvent.emit(this.tag);
  }

}
