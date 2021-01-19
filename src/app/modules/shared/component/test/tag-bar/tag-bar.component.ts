import { Observable, Subscription } from 'rxjs';
import { ITag } from './../tag/tag.interface';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';

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
    this.$tags.subscribe(tags => {
      this.tags = tags;
      this.foundTags.push(...this.tags.filter(tag => this.selectedTags.findIndex(selectedTag => selectedTag === tag) === -1));
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
    if (value) {
      this.foundTags.unshift({category: 'name', value});
    }
    this.searchResultShow = true;
  }

  public searchBlur(){
    setTimeout(() => this.searchResultShow = false, 200);
  }
}