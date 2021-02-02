import { SoftwareService } from '../../service/software.service';
import { ISoftware } from '../../interface/software.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';

@Component({
  selector: 'cbs-software-dashboard',
  templateUrl: './software-dashboard.component.html',
  styleUrls: ['./software-dashboard.component.css']
})
export class SoftwareDashboardComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $software: BehaviorSubject<ISoftware[]> = new BehaviorSubject<ISoftware[]>([]);

  constructor(
    private softwareService: SoftwareService
  ) { }

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

    this.softwareService.getSoftwareList(filter, sort).toPromise().then(software => this.$software.next(software));
  }

  public searchChanged(searchText: string): void{

  }

}
