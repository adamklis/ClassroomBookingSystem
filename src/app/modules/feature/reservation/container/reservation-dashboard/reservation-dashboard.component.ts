import { IPageable } from 'src/app/modules/shared/interface/pageable.interface';
import { UserService } from './../../../user/service/user.service';
import { RoomService } from './../../../room/service/room.service';
import { DateAdapter } from 'src/app/modules/shared/adapter/date.adapter';
import { IFilter } from './../../../../shared/interface/filter.interface';
import { NgbCalendarGregorian, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SortOrder } from './../../../../shared/enum/sort-order.enum';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from './../../service/reservation.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/interface/user.interface';
import { IReservation } from '../../interface/reservation.interface';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { faCalendar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Page } from 'src/app/modules/shared/model/page';

@Component({
  selector: 'cbs-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  faCalendar = faCalendar;
  faCheck = faCheck;

  public filterDateFrom: NgbDate;
  public filterDateTo: NgbDate;
  public showExpired = false;

  public $reservations: BehaviorSubject<IReservation[]> = new BehaviorSubject<IReservation[]>([]);
  public $searchTags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $selectedTags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);

  public currentPageNumber: number;
  public currentPage: Page;

  public userFilterPage: Page;
  public roomFilterPage: Page;
  public loadMoreFilter = false;

  private currentUser: IUser;
  private searchText = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private userService: UserService,
    private dateAdapter: DateAdapter
  ) {
    this.userFilterPage = new Page(5, 0, 0);
    this.roomFilterPage = new Page(5, 0, 0);
    this.currentPage = new Page(10, 0, 0);
    this.currentPageNumber = this.currentPage.getPageNumber();
  }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.user;

    this.filterDateFrom = new NgbCalendarGregorian().getToday();
    this.filterDateTo = new NgbCalendarGregorian().getToday();

    this.onFilterChanged();
  }

  public onSearchChanged(searchText: string): void {
    if (searchText !== this.searchText){
      this.userFilterPage = new Page(5, 0, 0);
      this.roomFilterPage = new Page(5, 0, 0);
    }
    this.searchText = searchText;
    const requests: Observable<IPageable<any>>[] = [];
    if (this.hasPermission(Permission.ROOM_VIEW)) {
      if (this.roomFilterPage.size > this.roomFilterPage.start || this.roomFilterPage.start === 0 ){
        const filter = new Filter('name', searchText);
        const sort = new Sort('name', SortOrder.ASCEND);
        requests.push(this.roomService.getRooms([filter], [sort], this.roomFilterPage));
      }
    }
    if (this.hasPermission(Permission.USER_VIEW)) {
        if (this.userFilterPage.size > this.userFilterPage.start || this.userFilterPage.start === 0 ){
        const filter = new Filter('all', searchText);
        const sort = new Sort('all', SortOrder.ASCEND);
        requests.push(this.userService.getUsers([filter], [sort], this.userFilterPage));
      }
    }

    forkJoin(requests).toPromise().then((result: IPageable<any>[]) => {
      this.translateService.get([
        'RESERVATION.FILTER.ROOM_ALIAS',
        'RESERVATION.FILTER.USER_ALIAS',
      ])
      .toPromise()
      .then(translation => {
        if (result){
          const flattenResult: IPageable<any>[] = result.reduce((acc, val) => acc.concat(val), []);
          if (flattenResult[0]){
            this.roomFilterPage = new Page(flattenResult[0].page.limit, flattenResult[0].page.size, flattenResult[0].page.start);
          }
          if (flattenResult[1]){
            this.userFilterPage = new Page(flattenResult[0].page.limit, flattenResult[0].page.size, flattenResult[0].page.start);
          }
          this.$searchTags.next([
            ...flattenResult[0] ? flattenResult[0].results.map(room => (
              {category: 'room.name', categoryAlias: translation['RESERVATION.FILTER.ROOM_ALIAS'], value: room.name}
            )) : [],
            ...flattenResult[1] ? flattenResult[1].results.map(user => (
              {category: 'user.email', categoryAlias: translation['RESERVATION.FILTER.USER_ALIAS'], value: `${user.forename} ${user.surname} <${user.email}>`}
            )) : []
          ]);
          this.loadMoreFilter = (
            this.roomFilterPage.size > this.roomFilterPage.start + this.roomFilterPage.limit ||
            this.userFilterPage.size > this.userFilterPage.start + this.userFilterPage.limit
          );
        }
      });
    });
  }

  public onFilterChanged(tags?: ITag[]): void {
    if (tags) {
      this.$selectedTags.next(tags);
    }
    const filters: IFilter[] = [];

    filters.push(...this.$selectedTags.value.map(tag => {
      if (tag.category === 'user.email') {
        return new Filter(tag.category, tag.value.slice(tag.value.indexOf(' <') + 2, tag.value.length - 1));
      } else {
        return new Filter(tag.category, tag.value);
      }
    }));

    if (!this.hasPermission(Permission.RESERVATION_VIEW)){
      filters.push(new Filter('user.uuid', this.currentUser.uuid));
    }

    let dateFrom = this.dateAdapter.toModel(this.filterDateFrom);
    const now = new Date();
    if (
      !this.showExpired &&
      dateFrom < now
    ) {
      dateFrom = now;
    }
    const dateTo = this.dateAdapter.toModel(this.filterDateTo);
    dateTo.setHours(23, 59, 59);
    filters.push(new Filter('dateFrom', dateFrom.toISOString()), new Filter('dateTo', dateTo.toISOString()));

    if (this.hasPermission(Permission.RESERVATION_VIEW) || this.hasPermission(Permission.RESERVATION_VIEW_USER)){
      this.reservationService.getReservations(
        filters,
        [new Sort('dateFrom', SortOrder.ASCEND)],
        this.currentPage.getPage(this.currentPageNumber)
      )
      .toPromise().then(reservations => {
        this.$reservations.next(reservations.results);
        this.currentPage = new Page(reservations.page.limit, reservations.page.size, reservations.page.start);
        this.currentPageNumber = this.currentPage.getPageNumber();
      });
    }
  }

  public toggleShowExpired(): void {
    this.showExpired = !this.showExpired;
    this.onFilterChanged();
  }

  public loadMoreTags(){
    this.userFilterPage.start += this.userFilterPage.limit;
    this.roomFilterPage.start += this.roomFilterPage.limit;
    this.onSearchChanged(this.searchText);
  }

  public searchLostFocus(){
    this.userFilterPage = new Page(5, 0, 0);
    this.roomFilterPage = new Page(5, 0, 0);
  }

  private hasPermission(permission: Permission): boolean {
    return this.currentUser.permissions.findIndex(userPermission => userPermission === permission) !== -1;
  }

}
