import { AuthenticationService } from '../authentication/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isCollapsed = true;

  constructor(public authService: AuthenticationService) {

   }

  ngOnInit(): void {

  }

}
