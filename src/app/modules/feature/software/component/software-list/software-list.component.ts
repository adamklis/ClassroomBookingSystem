import { ISoftware } from './../../interface/software.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
