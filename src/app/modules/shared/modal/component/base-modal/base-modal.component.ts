import { ButtonType } from '../../enum/button-type.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent implements OnInit {

  buttonTypes = ButtonType;

  public title = '';
  public message = '';
  public buttons: ButtonType[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public isButtonTypeSelected(buttonType: ButtonType): boolean {
    return this.buttons.findIndex(button => button === buttonType) !== -1;
  }

}
