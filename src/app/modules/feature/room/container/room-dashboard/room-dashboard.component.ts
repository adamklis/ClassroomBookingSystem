import { TranslateService } from '@ngx-translate/core';
import { SoftwareService } from './../../../software/service/software.service';
import { ApplianceService } from './../../../appliance/service/appliance.service';
import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { RoomService } from './../../service/room.service';
import { IRoom } from './../../interface/room.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { ActivatedRoute } from '@angular/router';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { IPageable } from 'src/app/modules/shared/interface/pageable.interface';
import { Page } from 'src/app/modules/shared/model/page';

@Component({
  selector: 'cbs-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.css']
})
export class RoomDashboardComponent implements OnInit {

  private currentUser = null;
  private searchText = '';
  private filterRequest: Subscription;
  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);
  public currentPageNumber: number;
  public currentPage: Page;

  public applianceFilterPage: Page;
  public softwareFilterPage: Page;
  public loadMoreFilter = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private roomService: RoomService,
    private applianceService: ApplianceService,
    private softwareService: SoftwareService
  ) {
    this.applianceFilterPage = new Page(5, 0, 0);
    this.softwareFilterPage = new Page(5, 0, 0);
    this.currentPage = new Page(10, 0, 0);
    this.currentPageNumber = this.currentPage.getPageNumber();
   }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.user;
    this.tagsChanged();
  }

  public tagsChanged(tags?: ITag[]){
    if (tags){
      this.$tags.next(tags);
    }
    this.applianceFilterPage = new Page(5, 0, 0);
    this.softwareFilterPage = new Page(5, 0, 0);
    const filter = [];
    const sort = [];
    this.$tags.value.forEach(tag => filter.push(new Filter(tag.category, tag.value)));
    sort.push(new Sort('numberOfSeats', SortOrder.ASCEND));
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.ROOM_VIEW) !== -1){
      this.roomService.getRooms(filter, sort, this.currentPage.getPage(this.currentPageNumber)).toPromise().then(rooms => {
        this.$rooms.next(rooms.results);
        this.currentPage = new Page(rooms.page.limit, rooms.page.size, rooms.page.start);
        this.currentPageNumber = this.currentPage.getPageNumber();
      });
    }
  }

  public searchChanged(searchText: string){
    if (searchText !== this.searchText){
      this.applianceFilterPage = new Page(5, 0, 0);
      this.softwareFilterPage = new Page(5, 0, 0);
    }
    this.searchText = searchText;
    const filter = new Filter('name', this.searchText);
    const sort = new Sort('name', SortOrder.ASCEND);
    const requests: Observable<IPageable<any>>[] = [];
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.APPLIANCE_VIEW) !== -1) {
      if (this.applianceFilterPage.size > this.applianceFilterPage.start || this.applianceFilterPage.start === 0 ){
        requests.push(this.applianceService.getAppliances([filter], [sort], this.applianceFilterPage));
      }
    }
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.SOFTWARE_VIEW) !== -1) {
      if (this.softwareFilterPage.size > this.softwareFilterPage.start || this.softwareFilterPage.start === 0 ){
        requests.push(this.softwareService.getSoftwareList([filter], [sort], this.softwareFilterPage));
      }
    }

    if (this.filterRequest){
      this.filterRequest.unsubscribe();
    }

    this.filterRequest = forkJoin(requests).subscribe((result: IPageable<any>[]) => {
      this.translateService.get([
        'ROOM.FILTER.APPLIANCE_ALIAS',
        'ROOM.FILTER.SOFTWARE_ALIAS'
      ])
      .toPromise()
      .then(translation => {
        if (result){
          const flattenResult: IPageable<any>[] = result.reduce((acc, val) => acc.concat(val), []);
          if (flattenResult[0]){
            this.applianceFilterPage = new Page(flattenResult[0].page.limit, flattenResult[0].page.size, flattenResult[0].page.start);
          }
          if (flattenResult[1]){
            this.softwareFilterPage = new Page(flattenResult[1].page.limit, flattenResult[1].page.size, flattenResult[1].page.start);
          }
          this.$tags.next([
            ...flattenResult[0] ? flattenResult[0].results.map(appliance => (
              {category: 'appliance', categoryAlias: translation['ROOM.FILTER.APPLIANCE_ALIAS'], value: appliance.name}
            )) : [],
            ...flattenResult[1] ? flattenResult[1].results.map(software => (
              {category: 'software', categoryAlias: translation['ROOM.FILTER.SOFTWARE_ALIAS'], value: software.name}
            )) : []
          ]);
          this.loadMoreFilter = (
            this.applianceFilterPage.size > this.applianceFilterPage.start + this.applianceFilterPage.limit ||
            this.softwareFilterPage.size > this.softwareFilterPage.start + this.softwareFilterPage.limit
          );
        }
      });
    });
  }

  public loadMoreTags(){
    this.applianceFilterPage.start += this.applianceFilterPage.limit;
    this.softwareFilterPage.start += this.softwareFilterPage.limit;
    this.searchChanged(this.searchText);
  }

  public searchLostFocus(){
    this.applianceFilterPage = new Page(5, 0, 0);
    this.softwareFilterPage = new Page(5, 0, 0);
  }

}
