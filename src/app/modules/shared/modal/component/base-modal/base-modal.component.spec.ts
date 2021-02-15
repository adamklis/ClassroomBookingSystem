import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalComponent } from './base-modal.component';
import { ButtonType } from '../../enum/button-type.enum';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseModalComponent ],
      providers: [
        {provide: NgbActiveModal, useValue: null}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('return true if button is on list else return false', () => {
    component.buttons = [ButtonType.CONFIRM, ButtonType.DELETE];
    expect(component.isButtonTypeSelected(ButtonType.CONFIRM)).toEqual(true);
    expect(component.isButtonTypeSelected(ButtonType.OK)).toEqual(false);
  });
});
