import { IAppliance } from './../../interface/appliance.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cbs-appliance-list',
  templateUrl: './appliance-list.component.html',
  styleUrls: ['./appliance-list.component.css']
})
export class ApplianceListComponent implements OnInit {

  @Input()
  public $appliances: Observable<IAppliance[]>;

  public appliances: IAppliance[];

  faPen = faPen;
  faPlus = faPlus;
  faInfo = faInfo;
  permissions = Permission;

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.$appliances.subscribe(appliances => this.appliances = appliances);
  }

}
