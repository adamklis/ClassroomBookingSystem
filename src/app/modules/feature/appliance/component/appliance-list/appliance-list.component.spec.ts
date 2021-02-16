import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/core/authorization/service/authorization.service';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceListComponent } from './appliance-list.component';
import { MockDirective } from 'src/app/modules/shared/test/mock.directive';

describe('ApplianceListComponent', () => {
  let component: ApplianceListComponent;
  let fixture: ComponentFixture<ApplianceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [
        ApplianceListComponent,
        MockDirective({
          selector: '[cbsPermissions]',
          inputs: []
        })
      ],
      providers: [
        {provide: AuthorizationService, useValue: null}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceListComponent);
    component = fixture.componentInstance;
    component.$appliances = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
