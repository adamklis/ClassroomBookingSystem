import { AuthorizationService } from './../../../../core/authorization/service/authorization.service';
import { ISoftwareUse } from './../../../software/interface/software.interface';
import { IApplianceUse } from './../../../appliance/interface/appliance.interface';
import { ApplianceService } from './../../../appliance/service/appliance.service';
import { SoftwareService } from './../../../software/service/software.service';
import { RoomService } from './../../service/room.service';
import { IRoom } from './../../interface/room.interface';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUse } from '../../interface/use.interface';
import { IFilter } from 'src/app/modules/shared/interface/filter.interface';
import { ISort } from 'src/app/modules/shared/interface/sort.interface';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';

@Component({
  selector: 'cbs-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faPen = faPen;
  permissions = Permission;
  permissionsMode = PermissionsMode;

  public room: IRoom;

  public softwareUsesSearchFunction: (filter?: IFilter[], sort?: ISort[]) => Observable<IUse[]>;
  public applianceUsesSearchFunction: (filter?: IFilter[], sort?: ISort[]) => Observable<IUse[]>;

  public nameControl = new FormControl('', [Validators.required]);
  public numberOfSeatsControl = new FormControl('', [Validators.required, Validators.min(1)]);
  public softwareUsesListControl = new FormControl({ value: ''} );
  public softwareUsesList: ISoftwareUse[];
  public applianceUsesList: IApplianceUse[];


  public roomForm = new FormGroup({
    name: this.nameControl,
    numberOfSeats: this.numberOfSeatsControl,
    softwareUsesList: this.softwareUsesListControl
  });

  constructor(
    public authorizationService: AuthorizationService,
    private applianceService: ApplianceService,
    private softwareService: SoftwareService,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
    ){
      this.softwareUsesSearchFunction = this.softwareService.getSoftwareUseList.bind(this.softwareService);
      this.applianceUsesSearchFunction = this.applianceService.getApplianceUseList.bind(this.applianceService);
    }

  ngOnInit(): void {
      this.resetForm();
  }

  public onRestoreClick(){
    this.translateService.get([
      'ROOM.MODAL.RESTORE_ROOM_TITLE',
      'ROOM.MODAL.RESTORE_ROOM_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['ROOM.MODAL.RESTORE_ROOM_TITLE'], message: translation['ROOM.MODAL.RESTORE_ROOM_MESSAGE']})
      .then(() => {
        this.resetForm();
      })
      .catch(error => {});
    });

  }

  public onDeleteClick(){
    this.translateService
    .get([
      'ROOM.MODAL.DELETE_ROOM_TITLE',
      'ROOM.MODAL.DELETE_ROOM_MESSAGE',
      'ROOM.MODAL.DELETE_ROOM_SUCCESS_TITLE',
      'ROOM.MODAL.DELETE_ROOM_SUCCESS_MESSAGE'
    ],
    {name: this.room.name})
    .toPromise()
    .then(translation => {
      this.modalService.showDeleteModal({
        title: translation['ROOM.MODAL.DELETE_ROOM_TITLE'],
        message: translation['ROOM.MODAL.DELETE_ROOM_MESSAGE']
      })
      .then(() => {
        this.roomService.deleteRoom(this.room.uuid)
        .then(() => {
          this.modalService.showInfoModal({title: translation['ROOM.MODAL.DELETE_ROOM_SUCCESS_TITLE'], message: translation['ROOM.MODAL.DELETE_ROOM_SUCCESS_MESSAGE']})
          .then(() => this.router.navigate(['rooms']));
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
    this.roomService.saveRoom(this.getFormRoomObject())
    .then(() => {
      this.translateService.get([
        'ROOM.MODAL.SAVE_ROOM_SUCCESS_TITLE',
        'ROOM.MODAL.SAVE_ROOM_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['ROOM.MODAL.SAVE_ROOM_SUCCESS_TITLE'], message: translation['ROOM.MODAL.SAVE_ROOM_SUCCESS_MESSAGE']});
      });
    })
    .catch(err => {
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  public onClearClick(){
    this.translateService.get([
      'ROOM.MODAL.RESTORE_ROOM_TITLE',
      'ROOM.MODAL.RESTORE_ROOM_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['ROOM.MODAL.RESTORE_ROOM_TITLE'], message: translation['ROOM.MODAL.RESTORE_ROOM_MESSAGE']})
      .then(() => {
        this.roomForm.reset();
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    this.room = this.getFormRoomObject();
    this.roomService.addRoom(this.room)
      .then(() => {
      this.translateService.get([
        'ROOM.MODAL.ADD_ROOM_SUCCESS_TITLE',
        'ROOM.MODAL.ADD_ROOM_SUCCESS_MESSAGE'
      ],
      {name: this.room.name})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['ROOM.MODAL.ADD_ROOM_SUCCESS_TITLE'], message: translation['ROOM.MODAL.ADD_ROOM_SUCCESS_MESSAGE']})
        .then(() => {
          this.room = null;
          this.resetForm();
        });
      });
    })
    .catch(err => {
      this.room = null;
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  private resetForm(): void{
    const roomUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    if (roomUuid && roomUuid !== '0') {
      this.roomService.getRoom(roomUuid).subscribe(room => {
        this.room = room;
        this.nameControl.setValue(this.room.name);
        this.numberOfSeatsControl.setValue(this.room.numberOfSeats);
        this.softwareUsesList = this.room.software;
        this.applianceUsesList = this.room.appliances;
      });
    } else {
      this.roomForm.reset();
    }
  }

  public applianceUsesChange(event: IApplianceUse[]) {
    this.applianceUsesList = event;
  }

  public softwareUsesChange(event: ISoftwareUse[]) {
    this.softwareUsesList = event;
  }

  private getFormRoomObject(): IRoom {
    return {
      uuid: this.room ? this.room.uuid : null,
      name: this.nameControl.value,
      numberOfSeats: this.numberOfSeatsControl.value,
      appliances: this.applianceUsesList,
      software: this.softwareUsesList
    };
  }



}
