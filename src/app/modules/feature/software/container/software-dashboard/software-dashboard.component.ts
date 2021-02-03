import { SoftwareService } from '../../service/software.service';
import { ISoftware } from '../../interface/software.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Page } from 'src/app/modules/shared/model/page';

@Component({
  selector: 'cbs-software-dashboard',
  templateUrl: './software-dashboard.component.html',
  styleUrls: ['./software-dashboard.component.css']
})
export class SoftwareDashboardComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $software: BehaviorSubject<ISoftware[]> = new BehaviorSubject<ISoftware[]>([]);
  public currentPageNumber: number;
  public currentPage: Page;

  constructor(
    private softwareService: SoftwareService
  ) {
    this.currentPage = new Page(10, 0, 0);
    this.currentPageNumber = this.currentPage.getPageNumber();
   }

  ngOnInit(): void {
    this.tagsChanged();
  }

  public tagsChanged(tags?: ITag[]): void{
    if (tags){
      this.$tags.next(tags);
    }
    const sort = [new Sort('name', SortOrder.ASCEND)];

    const filter = this.$tags.value.map(tag => {
      if (tag.category === 'keyword_int'){
        return new Filter('quantity', tag.value);
      } else {
        return new Filter('name', tag.value);
      }
    });

    this.softwareService.getSoftwareList(filter, sort, this.currentPage.getPage(this.currentPageNumber)).toPromise()
    .then(software => {
      this.$software.next(software.results);
      this.currentPage = new Page(software.page.limit, software.page.size, software.page.start);
      this.currentPageNumber = this.currentPage.getPageNumber();
    });
  }

  public searchChanged(searchText: string): void{

  }

}
