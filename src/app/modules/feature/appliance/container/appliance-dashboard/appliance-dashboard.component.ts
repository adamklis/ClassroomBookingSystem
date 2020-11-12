import { ApplianceService } from './../../service/appliance.service';
import { IAppliance } from './../../interface/appliance.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-appliance-dashboard',
  templateUrl: './appliance-dashboard.component.html',
  styleUrls: ['./appliance-dashboard.component.css']
})
export class ApplianceDashboardComponent implements OnInit {

  public appliances: IAppliance[];

  constructor(private applianceService: ApplianceService) { }

  ngOnInit(): void {
    this.applianceService.getAppliances().subscribe(appliances => this.appliances = appliances);
  }

}
