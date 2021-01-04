import { ISoftware } from './../../interface/software.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Permission } from 'src/app/modules/core/authorization/enum/permission.enum';

@Component({
  selector: 'cbs-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css']
})
export class SoftwareListComponent implements OnInit {

  @Input()
  public softwareList: ISoftware[];

  faPen = faPen;
  faPlus = faPlus;
  permissions = Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
