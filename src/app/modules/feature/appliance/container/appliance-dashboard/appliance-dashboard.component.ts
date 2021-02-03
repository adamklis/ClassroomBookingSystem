import { ApplianceService } from './../../service/appliance.service';
import { IAppliance } from './../../interface/appliance.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Page } from 'src/app/modules/shared/model/page';

@Component({
  selector: 'cbs-appliance-dashboard',
  templateUrl: './appliance-dashboard.component.html',
  styleUrls: ['./appliance-dashboard.component.css']
})
export class ApplianceDashboardComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $appliances: BehaviorSubject<IAppliance[]> = new BehaviorSubject<IAppliance[]>([]);
  public currentPageNumber: number;
  public currentPage: Page;

  constructor(
    private applianceService: ApplianceService
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

    this.applianceService.getAppliances(filter, sort, this.currentPage.getPage(this.currentPageNumber)).toPromise()
    .then(appliances => {
      this.$appliances.next(appliances.results);
      this.currentPage = new Page(appliances.page.limit, appliances.page.size, appliances.page.start);
      this.currentPageNumber = this.currentPage.getPageNumber();
    });
  }

  public searchChanged(searchText: string): void{

  }

}
