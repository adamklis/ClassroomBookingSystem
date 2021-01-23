import { Observable, Subscription } from 'rxjs';
import { ITag } from './tag.interface';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'cbs-tag-bar',
  templateUrl: './tag-bar.component.html',
  styleUrls: ['./tag-bar.component.css']
})
export class TagBarComponent implements OnInit, OnDestroy {

  @Input()
  public $tags: Observable<ITag[]>;

  @Input()
  public searchPlaceholder = 'Search...';

  @Input()
  public keywordCategoryAlias = 'keyword';

  @Input()
  public keywordIntCategoryAlias = 'number';

  @Output()
  public tagsChangeEvent: EventEmitter<ITag[]> = new EventEmitter<ITag[]>();

  @Output()
  public searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('search')
  public searchInputElement: ElementRef;

  public searchResultShow = false;

  public tags: ITag[] = [];
  public selectedTags: ITag[] = [];
  public foundTags: ITag[] = [];

  private tagsSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.tagsSubscription =  this.$tags.subscribe(tags => {
      this.tags = tags;
      this.foundTags.push(
        ...this.tags.filter(tag => this.selectedTags.findIndex(selectedTag =>
          selectedTag.category === tag.category && selectedTag.value === tag.value
        ) === -1)
      );
    });
  }

  ngOnDestroy(): void {
    this.tagsSubscription.unsubscribe();
  }

  public selectTag(selectedTag: ITag){
    this.selectedTags.push(selectedTag);
    this.tagsChangeEvent.emit(this.selectedTags);
    this.searchInputElement.nativeElement.value = '';
    this.searchInputElement.nativeElement.focus();
  }

  public removeTag(removeTag: ITag){
    this.selectedTags = this.selectedTags.filter(tag => tag !== removeTag);
    this.tagsChangeEvent.emit(this.selectedTags);
  }

  public searchClick(){
    if (!this.searchResultShow){
      this.searchInput();
    }
  }

  public searchInput(){
    const value = this.searchInputElement.nativeElement.value;
    this.searchChangeEvent.emit(value);
    this.foundTags = [];
    const numKeyword = Number(value);
    if (numKeyword && Number.isInteger(numKeyword)) {
      this.foundTags.unshift({category: 'keyword_int', categoryAlias: this.keywordIntCategoryAlias, value});
    }
    if (value) {
      this.foundTags.unshift({category: 'keyword', categoryAlias: this.keywordCategoryAlias, value});
    }
    this.searchResultShow = true;
  }

  public backspaceInput(){
    const value = this.searchInputElement.nativeElement.value;
    if (!value) {
      this.selectedTags.pop();
      this.tagsChangeEvent.emit(this.selectedTags);
    }
  }

  public enterInput(){
    const value = this.searchInputElement.nativeElement.value;
    if (value) {
      this.selectTag(this.foundTags[0]);
      this.searchResultShow = false;
    }
  }

  public searchBlur(){
    setTimeout(() => this.searchResultShow = false, 200);
  }
}
