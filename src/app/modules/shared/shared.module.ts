import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './modal/component/base-modal/base-modal.component';



@NgModule({
  declarations: [BaseModalComponent],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule { }
