import { Sort } from './../../model/sort';
import { Filter } from './../../model/filter';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { ApplianceService } from './../../../feature/appliance/service/appliance.service';
import { SoftwareService } from './../../../feature/software/service/software.service';
import { ITag } from '../tag-bar/tag.interface';
import { Component, OnInit } from '@angular/core';
import { SortOrder } from '../../enum/sort-order.enum';

@Component({
  selector: 'cbs-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);

  constructor(private softwareService: SoftwareService, private applianceService: ApplianceService) { }

  ngOnInit(): void {

  }

  public tagsChanged(tags: ITag[]){
    console.log(tags);
  }

  public searchChanged(searchText: string){
    const filter = new Filter('name', searchText);
    const sort = new Sort('name', SortOrder.ASCEND);
    forkJoin({
      appliances: this.applianceService.getAppliances([filter], [sort]),
      softwareList: this.softwareService.getSoftwareList([filter], [sort])
    }).toPromise().then(result => {
      this.$tags.next([
        ...result.appliances.map(appliance => ({category: 'appliance', value: appliance.name})),
        ...result.softwareList.map(software => ({category: 'software', value: software.name}))
      ]);
    });

  }

}
