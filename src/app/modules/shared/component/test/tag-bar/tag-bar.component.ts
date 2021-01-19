import { ITag } from './../tag/tag.interface';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'cbs-tag-bar',
  templateUrl: './tag-bar.component.html',
  styleUrls: ['./tag-bar.component.css']
})
export class TagBarComponent implements OnInit {

  @Input()
  public tags: ITag[] = [
    {category: 'Software', value: 'MS Visual Studio 2020'},
    {category: 'Software', value: 'MS Office 2010'},
    {category: 'Appliance', value: 'Projector Dell'},
    {category: 'Appliance', value: 'PC'}
  ];

  @Input()
  public searchPlaceholder = 'Search...';

  @Output()
  public tagsChangeEvent: EventEmitter<ITag[]> = new EventEmitter<ITag[]>();

  @Output()
  public searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('search')
  public searchInputElement: ElementRef;

  public searchResultShow = false;

  public selectedTags: ITag[] = [];
  public foundTags: ITag[] = [];

  constructor() { }

  ngOnInit(): void {
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
    const value = this.searchInputElement.nativeElement.value;
    this.searchChangeEvent.emit(value);
    this.foundTags = this.tags.filter(tag => this.selectedTags.findIndex(selectedTag => selectedTag === tag) === -1);
    if (value) {
      this.foundTags.unshift({category: 'name', value});
    }
    this.searchResultShow = true;
  }

  public searchInput(){
    this.searchClick();
  }

  public searchBlur(){
    setTimeout(() => this.searchResultShow = false, 200);
  }
}
