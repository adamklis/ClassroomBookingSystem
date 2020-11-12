import { IAppliance } from './../../interface/appliance.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
