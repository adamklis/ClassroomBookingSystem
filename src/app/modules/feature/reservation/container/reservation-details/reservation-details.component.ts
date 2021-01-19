import { IReservation } from './../../interface/reservation.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faCalendar, faEraser } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';

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

  public roomNameControl = new FormControl('');
  public applianceControl = new FormControl('');
  public softwareControl = new FormControl('');


  public reservationForm = new FormGroup({
    user: this.userControl,
    message: this.messageControl,
    reservationPeriod: new FormGroup({
      dateFrom: this.dateFromControl,
      dateTo: this.dateToControl
    }),
    filter: new FormGroup({
      roomName: this.roomNameControl,
      appliance: this.applianceControl,
      software: this.softwareControl
    })
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {

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

}
