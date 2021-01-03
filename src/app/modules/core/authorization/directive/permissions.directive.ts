import { AuthorizationService } from './../service/authorization.service';
import { Permission } from './../enum/permission.enum';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[cbsPermissions]'
})
export class PermissionsDirective implements OnInit {

  @Input()
  public permissions: Permission[];

  constructor(private authorizationService: AuthorizationService, private element: ElementRef){

  }
  ngOnInit(): void {
    this.authorizationService.currentUser$.subscribe(user => {

      let userPermitted = false;
      if (user){
        this.permissions.forEach(permission => {
          if (user.permissions.findIndex(userPermission => userPermission === permission) !== -1) { userPermitted = true; }
        });
      }

      if (!userPermitted){
        this.element.nativeElement.style.display = 'none';
      } else {
        this.element.nativeElement.style.display = 'block';
      }
    });
  }

}
