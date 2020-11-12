import { SoftwareService } from '../../service/software.service';
import { ISoftware } from '../../interface/software.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-software-dashboard',
  templateUrl: './software-dashboard.component.html',
  styleUrls: ['./software-dashboard.component.css']
})
export class SoftwareDashboardComponent implements OnInit {

  public softwareList: ISoftware[];

  constructor(private softwareService: SoftwareService) { }

  ngOnInit(): void {
    this.softwareService.getSoftwareList().subscribe(softwareList => this.softwareList = softwareList);
  }

}
