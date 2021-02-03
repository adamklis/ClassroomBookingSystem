import { TranslateService } from '@ngx-translate/core';
import { SoftwareService } from './../../../software/service/software.service';
import { ApplianceService } from './../../../appliance/service/appliance.service';
import { Permission } from './../../../../core/authorization/enum/permission.enum';
import { RoomService } from './../../service/room.service';
import { IRoom } from './../../interface/room.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { ActivatedRoute } from '@angular/router';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { IPageable } from 'src/app/modules/shared/interface/pageable.interface';

@Component({
  selector: 'cbs-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.css']
})
export class RoomDashboardComponent implements OnInit {

  private currentUser = null;
  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private roomService: RoomService,
    private applianceService: ApplianceService,
    private softwareService: SoftwareService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.user;
    this.roomService.getRooms().toPromise().then(rooms => this.$rooms.next(rooms));
  }

  public tagsChanged(tags: ITag[]){
    const filter = [];
    const sort = [];
    tags.forEach(tag => filter.push(new Filter(tag.category, tag.value)));
    sort.push(new Sort('numberOfSeats', SortOrder.ASCEND));
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.ROOM_VIEW) !== -1){
      this.roomService.getRooms(filter, sort).toPromise().then(rooms => {
        this.$rooms.next(rooms);
      });
    }
  }

  public searchChanged(searchText: string){
    const filter = new Filter('name', searchText);
    const sort = new Sort('name', SortOrder.ASCEND);
    const requests: Observable<IPageable<any>>[] = [];
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.APPLIANCE_VIEW) !== -1) {
      requests.push(this.applianceService.getAppliances([filter], [sort]));
    }
    if (this.currentUser.permissions.findIndex(permission => permission === Permission.SOFTWARE_VIEW) !== -1) {
      requests.push(this.softwareService.getSoftwareList([filter], [sort]));
    }
    forkJoin(requests).toPromise().then((result: IPageable<any>[]) => {
      this.translateService.get([
        'ROOM.FILTER.APPLIANCE_ALIAS',
        'ROOM.FILTER.SOFTWARE_ALIAS'
      ])
      .toPromise()
      .then(translation => {
        if (result){
          const flattenResult: IPageable<any>[] = result.reduce((acc, val) => acc.concat(val), []);
          this.$tags.next([
            ...flattenResult[0].results.map(appliance => (
              {category: 'appliance', categoryAlias: translation['ROOM.FILTER.APPLIANCE_ALIAS'], value: appliance.name}
            )),
            ...flattenResult[1].results.map(software => (
              {category: 'software', categoryAlias: translation['ROOM.FILTER.SOFTWARE_ALIAS'], value: software.name}
            ))
          ]);
        }
      });
    });
  }

}
