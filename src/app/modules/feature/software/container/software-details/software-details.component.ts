import { periodValidator } from 'src/app/modules/shared/validator/period-validator';
import { DateAdapter } from 'src/app/modules/shared/adapter/date.adapter';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { SoftwareService } from './../../service/software.service';
import { ISoftware } from './../../interface/software.interface';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCalendar, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';

@Component({
  selector: 'cbs-software-details',
  templateUrl: './software-details.component.html',
  styleUrls: ['./software-details.component.css']
})
export class SoftwareDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faCalendar = faCalendar;
  faEraser = faEraser;
  permissions = Permission;
  permissionsMode = PermissionsMode;

  public software: ISoftware;

  public nameControl = new FormControl('', [Validators.required]);
  public quantityControl = new FormControl('', [Validators.required, Validators.min(1)]);
  public validFromControl = new FormControl(null, []);
  public validToControl = new FormControl(null, []);

  public softwareForm = new FormGroup({
    name: this.nameControl,
    quantity: this.quantityControl,
    validPeriod: new FormGroup({
      validFrom: this.validFromControl,
      validTo: this.validToControl
    }, [ periodValidator() ])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private softwareService: SoftwareService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router,
    private dateAdapter: DateAdapter
    ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  public onRestoreClick(){
    this.translateService.get([
      'SOFTWARE.MODAL.RESTORE_SOFTWARE_TITLE',
      'SOFTWARE.MODAL.RESTORE_SOFTWARE_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['SOFTWARE.MODAL.RESTORE_SOFTWARE_TITLE'], message: translation['SOFTWARE.MODAL.RESTORE_SOFTWARE_MESSAGE']})
      .then(() => {
        this.resetForm();
      })
      .catch(error => {});
    });

  }

  public onDeleteClick(){
    this.translateService
    .get([
      'SOFTWARE.MODAL.DELETE_SOFTWARE_TITLE',
      'SOFTWARE.MODAL.DELETE_SOFTWARE_MESSAGE',
      'SOFTWARE.MODAL.DELETE_SOFTWARE_SUCCESS_TITLE',
      'SOFTWARE.MODAL.DELETE_SOFTWARE_SUCCESS_MESSAGE'
    ],
    {name: this.software.name})
    .toPromise()
    .then(translation => {
      this.modalService.showDeleteModal({
        title: translation['SOFTWARE.MODAL.DELETE_SOFTWARE_TITLE'],
        message: translation['SOFTWARE.MODAL.DELETE_SOFTWARE_MESSAGE']
      })
      .then(() => {
        this.softwareService.deleteSoftware(this.software.uuid)
        .then(() => {
          this.modalService.showInfoModal({title: translation['SOFTWARE.MODAL.DELETE_SOFTWARE_SUCCESS_TITLE'], message: translation['SOFTWARE.MODAL.DELETE_SOFTWARE_SUCCESS_MESSAGE']})
          .then(() => this.router.navigate(['software']));
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
    this.software = this.getFormSoftwareObject();
    this.softwareService.saveSoftware(this.software)
    .then(() => {
      this.translateService.get([
        'SOFTWARE.MODAL.SAVE_SOFTWARE_SUCCESS_TITLE',
        'SOFTWARE.MODAL.SAVE_SOFTWARE_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['SOFTWARE.MODAL.SAVE_SOFTWARE_SUCCESS_TITLE'], message: translation['SOFTWARE.MODAL.SAVE_SOFTWARE_SUCCESS_MESSAGE']});
      });
    })
    .catch(err => {
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  public onClearClick(){
    this.translateService.get([
      'SOFTWARE.MODAL.RESTORE_SOFTWARE_TITLE',
      'SOFTWARE.MODAL.RESTORE_SOFTWARE_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['SOFTWARE.MODAL.RESTORE_SOFTWARE_TITLE'], message: translation['SOFTWARE.MODAL.RESTORE_SOFTWARE_MESSAGE']})
      .then(() => {
        this.softwareForm.reset();
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    const newSoftware = this.getFormSoftwareObject();
    this.softwareService.addSoftware(newSoftware)
    .then(() => {
      this.translateService.get([
        'SOFTWARE.MODAL.ADD_SOFTWARE_SUCCESS_TITLE',
        'SOFTWARE.MODAL.ADD_SOFTWARE_SUCCESS_MESSAGE'
      ],
      {name: newSoftware.name})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['SOFTWARE.MODAL.ADD_SOFTWARE_SUCCESS_TITLE'], message: translation['SOFTWARE.MODAL.ADD_SOFTWARE_SUCCESS_MESSAGE']})
        .then(() => {
          this.resetForm();
        });
      });
    })
    .catch(err => {
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  private resetForm(): void{
    const softwareUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    if (softwareUuid && softwareUuid !== '0') {
      this.softwareService.getSoftware(softwareUuid).subscribe(software => {
        this.software = software;
        this.nameControl.setValue(this.software.name);
        this.quantityControl.setValue(this.software.quantity);
        this.validFromControl.setValue(this.dateAdapter.fromModel(this.software.validFrom));
        this.validToControl.setValue(this.dateAdapter.fromModel(this.software.validTo));
      });
    } else {
      this.softwareForm.reset();
    }
    this.softwareForm.markAsUntouched();
    this.softwareForm.markAsPristine();
  }

  private getFormSoftwareObject(): ISoftware {
    return {
      uuid: this.software ? this.software.uuid : null,
      name: this.nameControl.value,
      quantity: this.quantityControl.value,
      validFrom: this.dateAdapter.toModel(this.validFromControl.value),
      validTo: this.dateAdapter.toModel(this.validToControl.value)
    };
  }

}
