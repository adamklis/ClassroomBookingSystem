import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './modal/component/base-modal/base-modal.component';
import { SearchModalComponent } from './modal/component/search-modal/search-modal.component';
import { ResultListComponent } from './modal/component/search-modal/result-list/result-list.component';
import { SearchInputComponent } from './modal/component/search-modal/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './component/test/test.component';
import { TagComponent } from './component/tag-bar/tag/tag.component';
import { TagBarComponent } from './component/tag-bar/tag-bar.component';



@NgModule({
  declarations: [BaseModalComponent, SearchModalComponent, ResultListComponent, SearchInputComponent, TestComponent, TagComponent, TagBarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
