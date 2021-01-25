import { UserService } from './../../../user/service/user.service';
import { ReservationService } from './../../service/reservation.service';
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
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { datetimePeriodValidator } from 'src/app/modules/shared/validator/datetime-period-validator';
import { DateAdapter } from 'src/app/modules/shared/adapter/date.adapter';
import { TimeAdapter } from 'src/app/modules/shared/adapter/time.adapter';
import { IUser } from '../../../user/interface/user.interface';

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

  public userControl = new FormControl({}, [Validators.required]);
  public messageControl = new FormControl('', []);
  public dateFromControl = new FormControl('', [Validators.required]);
  public timeFromControl = new FormControl('', [Validators.required]);
  public dateToControl = new FormControl('', [Validators.required]);
  public timeToControl = new FormControl('', [Validators.required]);

  public reservationForm = new FormGroup({
    user: this.userControl,
    message: this.messageControl,
    reservationPeriod: new FormGroup({
      dateFrom: this.dateFromControl,
      timeFrom: this.timeFromControl,
      dateTo: this.dateToControl,
      timeTo: this.timeToControl
    }, [ datetimePeriodValidator() ])
  });

  public selectedRoom: IRoom;

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([]);
  public $users: BehaviorSubject<{key: IUser, value: string}[]> = new BehaviorSubject<{key: IUser, value: string}[]>([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router,
    private softwareService: SoftwareService,
    private applianceService: ApplianceService,
    private userService: UserService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private dateAdapter: DateAdapter,
    private timeAdapter: TimeAdapter,
    public authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.roomService.getRooms().toPromise().then(rooms => {
      this.$rooms.next(rooms);
    });
  }

  public onRestoreClick(){
    this.translateService.get([
      'RESERVATION.MODAL.RESTORE_RESERVATION_TITLE',
      'RESERVATION.MODAL.RESTORE_RESERVATION_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['RESERVATION.MODAL.RESTORE_RESERVATION_TITLE'], message: translation['RESERVATION.MODAL.RESTORE_RESERVATION_MESSAGE']})
      .then(() => {
        this.resetForm();
      })
      .catch(error => {});
    });
  }

  public onDeleteClick(){
    this.translateService
    .get([
      'RESERVATION.MODAL.DELETE_RESERVATION_TITLE',
      'RESERVATION.MODAL.DELETE_RESERVATION_MESSAGE',
      'RESERVATION.MODAL.DELETE_RESERVATION_SUCCESS_TITLE',
      'RESERVATION.MODAL.DELETE_RESERVATION_SUCCESS_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showDeleteModal({
        title: translation['RESERVATION.MODAL.DELETE_SOFTWARE_TITLE'],
        message: translation['RESERVATION.MODAL.DELETE_SOFTWARE_MESSAGE']
      })
      .then(() => {
        this.reservationService.deleteReservation(this.reservation.uuid)
        .then(() => {
          this.modalService.showInfoModal({title: translation['RESERVATION.MODAL.DELETE_RESERVATION_SUCCESS_TITLE'], message: translation['RESERVATION.MODAL.DELETE_RESERVATION_SUCCESS_MESSAGE']})
          .then(() => this.router.navigate(['reservation']));
        })
        .catch(err => {
          this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(errorTranslation =>
            this.modalService.showInfoModal({title: errorTranslation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
        });
      })
      .catch(error => {});
    });
  }

  public onSaveClick(){
    this.reservationService.saveReservation(this.getFormReservationObject())
    .then(() => {
      this.translateService.get([
        'RESERVATION.MODAL.SAVE_RESERVATION_SUCCESS_TITLE',
        'RESERVATION.MODAL.SAVE_RESERVATION_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['RESERVATION.MODAL.SAVE_RESERVATION_SUCCESS_TITLE'], message: translation['RESERVATION.MODAL.SAVE_RESERVATION_SUCCESS_MESSAGE']});
      });
    })
    .catch(err => {
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  public onClearClick(){
    this.translateService.get([
      'RESERVATION.MODAL.RESTORE_RESERVATION_TITLE',
      'RESERVATION.MODAL.RESTORE_RESERVATION_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['RESERVATION.MODAL.RESTORE_RESERVATION_TITLE'], message: translation['RESERVATION.MODAL.RESTORE_RESERVATION_MESSAGE']})
      .then(() => {
        this.resetForm();
        this.selectedRoom = null;
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    this.reservation = this.getFormReservationObject();
    this.reservationService.addReservation(this.reservation)
    .then(() => {
      this.translateService.get([
        'RESERVATION.MODAL.ADD_RESERVATION_SUCCESS_TITLE',
        'RESERVATION.MODAL.ADD_RESERVATION_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['RESERVATION.MODAL.ADD_RESERVATION_SUCCESS_TITLE'], message: translation['RESERVATION.MODAL.ADD_RESERVATION_SUCCESS_MESSAGE']})
        .then(() => {
          this.reservation = null;
          this.selectedRoom = null;
          this.resetForm();
        });
      });
    })
    .catch(err => {
      this.reservation = null;
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
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
    this.reservationForm.markAsDirty();
  }

  public searchUserInputChanged(input: string){
    this.userControl.markAsDirty();
    const filter = new Filter('all', input);
    const sort = new Sort('all', SortOrder.ASCEND);
    this.userService.getUsers([filter], [sort]).toPromise()
      .then(users => this.$users.next(users.map(user => ({key: user, value: `${user.forename} ${user.surname} <${user.email}>`}))));
  }

  private resetForm(): void{
    const reservationUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    if (reservationUuid && reservationUuid !== '0') {
      this.reservationService.getReservation(reservationUuid).subscribe(reservation => {
        this.reservation = reservation;
        this.userControl.setValue(
          {
            key: this.reservation.user,
            value: this.reservation.user.forename + ' ' + this.reservation.user.surname + ' <' + this.reservation.user.email + '>'
          }
        );
        this.messageControl.setValue(this.reservation.message);
        this.dateFromControl.setValue(this.dateAdapter.fromModel(this.reservation.dateFrom));
        this.timeFromControl.setValue(this.timeAdapter.fromModel(this.reservation.dateFrom));
        this.dateToControl.setValue(this.dateAdapter.fromModel(this.reservation.dateTo));
        this.timeToControl.setValue(this.timeAdapter.fromModel(this.reservation.dateTo));
        this.selectedRoom = this.reservation.room;
      });
    } else {
      this.reservationForm.reset();
      const currentUser = this.authorizationService.currentUser$.getValue();
      this.userControl.setValue(
        {
          key: currentUser,
          value: currentUser.forename + ' ' + currentUser.surname + ' <' + currentUser.email + '>'
        }
      );
    }
    this.reservationForm.markAsUntouched();
    this.reservationForm.markAsPristine();
  }

  private getFormReservationObject(): IReservation {
    const dateFrom = new Date(
      this.dateAdapter.toModel(this.dateFromControl.value).getTime() +
      this.timeAdapter.toModel(this.timeFromControl.value).getTime()
    );
    const dateTo = new Date(
      this.dateAdapter.toModel(this.dateToControl.value).getTime() +
      this.timeAdapter.toModel(this.timeToControl.value).getTime()
    );

    return {
      uuid: this.reservation ? this.reservation.uuid : null,
      user: this.userControl.value,
      message: this.messageControl.value,
      dateFrom,
      dateTo,
      room: this.selectedRoom
    };
  }

}
