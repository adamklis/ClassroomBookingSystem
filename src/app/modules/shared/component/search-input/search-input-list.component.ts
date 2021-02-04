import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cbs-search-input-list',
  templateUrl: './search-input-list.component.html',
  styleUrls: ['./search-input-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputListComponent),
      multi: true
    },
  ]
})
export class SearchInputListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  public $searchResults: Observable<{key: any, value: string}[]>;

  @Input()
  public searchPlaceholder = 'Search...';

  @Input()
  public loadMore = false;

  @Output()
  public searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public loadMoreClickEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  public lostFocusEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('search')
  public searchInputElement: ElementRef;
  public searchInputValue = '';
  public disabled: boolean;

  public searchResultShow = false;
  public searchResults: {key: any, value: string}[];
  private searchResultsSubscription: Subscription;
  private resultHideTimeout: any;

  public componentValue: {key: any, value: string};

  constructor() { }

  ngOnInit(): void {
    this.searchResultsSubscription =  this.$searchResults.subscribe(searechResults => this.searchResults = searechResults);
  }

  ngOnDestroy(): void {
    this.searchResultsSubscription.unsubscribe();
  }

  // value accessor methods

  onChange: any = () => {};
  onTouched = () => {};

  writeValue(obj: {key: any, value: string}): void {
    this.componentValue = obj;
    this.searchInputValue = obj?.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // input events

  public searchInputClick(){
    if (!this.searchResultShow){
      this.searchInputElement.nativeElement.select();
      this.searchInputInput();
    }
  }

  public searchInputInput(){
    this.searchChangeEvent.emit(this.searchInputValue);
    this.searchResults = [];
    this.searchResultShow = true;
  }

  public enterInput(){
    if (this.searchInputValue) {
      this.selectSearchResult(this.searchResults[0]);
      this.searchResultShow = false;
    }
  }

  public blurInput(){
    this.resultHideTimeout = setTimeout(() =>  {
      this.searchInputValue = this.componentValue.value;
      this.searchResultShow = false;
      this.lostFocusEvent.emit();
    }, 200);
  }

  // list events

  public selectSearchResult(selectedResult: {key: any, value: string}){
    this.componentValue = selectedResult;
    this.searchInputValue = selectedResult.value;
    this.onChange(this.componentValue);
  }

  public loadMoreClick(){
    clearTimeout(this.resultHideTimeout);
    this.searchInputElement.nativeElement.focus();
    this.loadMoreClickEvent.emit();
  }

}
