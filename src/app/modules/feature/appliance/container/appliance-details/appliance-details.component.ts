import { ApplianceService } from './../../service/appliance.service';
import { IAppliance } from './../../interface/appliance.interface';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/modal/service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { PermissionsMode } from 'src/app/modules/core/authorization/enum/permissions-mode.enum';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';

@Component({
  selector: 'cbs-appliance-details',
  templateUrl: './appliance-details.component.html',
  styleUrls: ['./appliance-details.component.css']
})
export class ApplianceDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  permissions = Permission;
  permissionsMode = PermissionsMode;

  public appliance: IAppliance;

  public nameControl = new FormControl('', [Validators.required]);
  public quantityControl = new FormControl('', [Validators.required, Validators.min(1)]);


  public applianceForm = new FormGroup({
    name: this.nameControl,
    quantity: this.quantityControl
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private applianceService: ApplianceService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  public onRestoreClick(){
    this.translateService.get([
      'APPLIANCE.MODAL.RESTORE_APPLIANCE_TITLE',
      'APPLIANCE.MODAL.RESTORE_APPLIANCE_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['APPLIANCE.MODAL.RESTORE_APPLIANCE_TITLE'], message: translation['APPLIANCE.MODAL.RESTORE_APPLIANCE_MESSAGE']})
      .then(() => {
        this.resetForm();
      })
      .catch(error => {});
    });

  }

  public onDeleteClick(){
    this.translateService
    .get([
      'APPLIANCE.MODAL.DELETE_APPLIANCE_TITLE',
      'APPLIANCE.MODAL.DELETE_APPLIANCE_MESSAGE',
      'APPLIANCE.MODAL.DELETE_APPLIANCE_SUCCESS_TITLE',
      'APPLIANCE.MODAL.DELETE_APPLIANCE_SUCCESS_MESSAGE'
    ],
    {name: this.appliance.name})
    .toPromise()
    .then(translation => {
      this.modalService.showDeleteModal({
        title: translation['APPLIANCE.MODAL.DELETE_APPLIANCE_TITLE'],
        message: translation['APPLIANCE.MODAL.DELETE_APPLIANCE_MESSAGE']
      })
      .then(() => {
        this.applianceService.deleteAppliance(this.appliance.uuid)
        .then(() => {
          this.modalService.showInfoModal({title: translation['APPLIANCE.MODAL.DELETE_APPLIANCE_SUCCESS_TITLE'], message: translation['APPLIANCE.MODAL.DELETE_APPLIANCE_SUCCESS_MESSAGE']})
          .then(() => this.router.navigate(['appliances']));
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
    this.applianceService.saveAppliance(this.getFormApplianceObject())
    .then(() => {
      this.translateService.get([
        'APPLIANCE.MODAL.SAVE_APPLIANCE_SUCCESS_TITLE',
        'APPLIANCE.MODAL.SAVE_APPLIANCE_SUCCESS_MESSAGE'
      ])
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['APPLIANCE.MODAL.SAVE_APPLIANCE_SUCCESS_TITLE'], message: translation['APPLIANCE.MODAL.SAVE_APPLIANCE_SUCCESS_MESSAGE']});
      });
    })
    .catch(err => {
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  public onClearClick(){
    this.translateService.get([
      'APPLIANCE.MODAL.RESTORE_APPLIANCE_TITLE',
      'APPLIANCE.MODAL.RESTORE_APPLIANCE_MESSAGE'
    ])
    .toPromise()
    .then(translation => {
      this.modalService.showConfirmModal({title: translation['APPLIANCE.MODAL.RESTORE_APPLIANCE_TITLE'], message: translation['APPLIANCE.MODAL.RESTORE_APPLIANCE_MESSAGE']})
      .then(() => {
        this.applianceForm.reset();
      })
      .catch(error => {});
    });
  }

  public onAddClick(){
    this.appliance = this.getFormApplianceObject();
    this.applianceService.addAppliance(this.appliance)
    .then(() => {
      this.translateService.get([
        'APPLIANCE.MODAL.ADD_APPLIANCE_SUCCESS_TITLE',
        'APPLIANCE.MODAL.ADD_APPLIANCE_SUCCESS_MESSAGE'
      ],
      {name: this.appliance.name})
      .toPromise()
      .then(translation => {
        this.modalService.showInfoModal({title: translation['APPLIANCE.MODAL.ADD_APPLIANCE_SUCCESS_TITLE'], message: translation['APPLIANCE.MODAL.ADD_APPLIANCE_SUCCESS_MESSAGE']})
        .then(() => {
          this.appliance = null;
          this.resetForm();
        });
      });
    })
    .catch(err => {
      this.appliance = null;
      this.translateService.get(['SHARED.VALIDATION.ERROR']).toPromise().then(translation =>
        this.modalService.showInfoModal({title: translation['SHARED.VALIDATION.ERROR'], message: err.error}).then());
    });
  }

  private resetForm(): void{
    const applianceUuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    if (applianceUuid && applianceUuid !== '0') {
      this.applianceService.getAppliance(applianceUuid).subscribe(appliance => {
        this.appliance = appliance;
        this.nameControl.setValue(this.appliance.name);
        this.quantityControl.setValue(this.appliance.quantity);
      });
    } else {
      this.applianceForm.reset();
    }
    this.applianceForm.markAsPristine();
    this.applianceForm.markAsUntouched();
  }

  private getFormApplianceObject(): IAppliance {
    return {
      uuid: this.appliance ? this.appliance.uuid : null,
      name: this.nameControl.value,
      quantity: this.quantityControl.value
    };
  }

}
