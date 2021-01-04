import { IAppliance } from './../../interface/appliance.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';

@Component({
  selector: 'cbs-appliance-list',
  templateUrl: './appliance-list.component.html',
  styleUrls: ['./appliance-list.component.css']
})
export class ApplianceListComponent implements OnInit {

  @Input()
  public appliances: IAppliance[];

  faPen = faPen;
  faPlus = faPlus;
  permissions = Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
