import { AuthorizationService } from './../../../../core/authorization/service/authorization.service';
import { ISoftware } from './../../interface/software.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';
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
  faInfo = faInfo;
  permissions = Permission;

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

}
