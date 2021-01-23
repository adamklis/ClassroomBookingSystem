import { IRoom } from './../../../room/interface/room.interface';
import { RoomService } from './../../../room/service/room.service';
import { IReservation } from './../../interface/reservation.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faCalendar, faEraser } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { SoftwareService } from '../../../software/service/software.service';
import { ApplianceService } from '../../../appliance/service/appliance.service';

@Component({
  selector: 'cbs-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCalendar = faCalendar;
  faEraser = faEraser;
  permissions = Permission;
  permissionsMode = PermissionsMode;

  public reservation: IReservation;

  public userControl = new FormControl('', [Validators.required]);
  public messageControl = new FormControl('', []);
  public dateFromControl = new FormControl('', [Validators.required]);
  public dateToControl = new FormControl('', [Validators.required]);

  public reservationForm = new FormGroup({
    user: this.userControl,
    message: this.messageControl,
    reservationPeriod: new FormGroup({
      dateFrom: this.dateFromControl,
      dateTo: this.dateToControl
    })
  });

  public selectedRoom: IRoom;

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router,
    private softwareService: SoftwareService, private applianceService: ApplianceService, private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.roomService.getRooms().toPromise().then(rooms => {
      this.$rooms.next(rooms);
    });
  }

  public onRestoreClick(){

  }

  public onDeleteClick(){

  }

  public onSaveClick(){

  }

  public onClearClick(){

  }

  public onAddClick(){

  }

  public tagsChanged(tags: ITag[]){
    const filter = [];
    const sort = [];
    tags.forEach(tag => filter.push(new Filter(tag.category, tag.value)));
    sort.push(new Sort('numberOfSeats', SortOrder.ASCEND));
    this.roomService.getRooms(filter, sort).toPromise().then(rooms => {
      this.$rooms.next(rooms);
    });
  }

  public searchChanged(searchText: string){
    const filter = new Filter('name', searchText);
    const sort = new Sort('name', SortOrder.ASCEND);
    forkJoin({
      appliances: this.applianceService.getAppliances([filter], [sort]),
      softwareList: this.softwareService.getSoftwareList([filter], [sort])
    }).toPromise().then(result => {
      this.translateService.get([
        'RESERVATION.DETAILS.FILTER.APPLIANCE_ALIAS',
        'RESERVATION.DETAILS.FILTER.SOFTWARE_ALIAS'
      ])
      .toPromise()
      .then(translation => {
        this.$tags.next([
          ...result.appliances.map(appliance => ({category: 'appliance', categoryAlias: translation['RESERVATION.DETAILS.FILTER.APPLIANCE_ALIAS'], value: appliance.name})),
          ...result.softwareList.map(software => ({category: 'software', categoryAlias: translation['RESERVATION.DETAILS.FILTER.SOFTWARE_ALIAS'], value: software.name}))
        ]);
      });
    });
  }

  public roomSelected(room: IRoom){
    this.selectedRoom = room;
  }

}
