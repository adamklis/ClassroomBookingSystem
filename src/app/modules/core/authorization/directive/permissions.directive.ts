import { AuthorizationService } from './../service/authorization.service';
import { Permission } from './../enum/permission.enum';
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PermissionsMode } from '../enum/permissions-mode.enum';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[cbsPermissions]'
})
export class PermissionsDirective implements OnInit, OnDestroy {

  @Input()
  public permissions: Permission[];

  @Input()
  public mode: PermissionsMode = PermissionsMode.HIDDEN;

  @Input()
  public overridePermited = null;

  private userSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService, private renderer: Renderer2, private element: ElementRef){

  }
  ngOnInit(): void {
    this.userSubscription = this.authorizationService.currentUser$.subscribe(user => {

      let userPermitted = false;
      if (user){
        this.permissions.forEach(permission => {
          if (user.permissions.findIndex(userPermission => userPermission === permission) !== -1) { userPermitted = true; }
        });
      }

      if (this.overridePermited !== null){
        userPermitted = this.overridePermited;
      }

      if (!userPermitted){
        switch (this.mode) {
          case PermissionsMode.HIDDEN:
            this.element.nativeElement.style.display = 'none';
            break;
          case PermissionsMode.INVISIBLE:
            this.element.nativeElement.style.visibility = 'hidden';
            break;
          case PermissionsMode.DISABLED:
            this.renderer.setProperty(this.element.nativeElement, 'disabled', true);
            break;
          }
      } else {
        switch (this.mode) {
          case PermissionsMode.HIDDEN:
            this.element.nativeElement.style.display = 'block';
            break;
          case PermissionsMode.INVISIBLE:
            this.element.nativeElement.style.visibility = 'visible';
            break;
          case PermissionsMode.DISABLED:
            this.renderer.setProperty(this.element.nativeElement, 'disabled', null);
            break;
        }
      }
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
