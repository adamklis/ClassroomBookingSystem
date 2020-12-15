import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cbs-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit{

  @Input()
  public searchTextValue: string;

  @Input()
  public busy = false;

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchText')
  public searchTextInput: NgControl;

  public searchTextSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  inputEvent($event) {
    this.searchEvent.emit(this.searchTextValue);
  }

}
