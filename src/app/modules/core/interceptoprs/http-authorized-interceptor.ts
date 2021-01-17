import { CookieService } from 'ngx-cookie-service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpAuthorizedInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookieService.check('access_token')){
      const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.cookieService.get('access_token')}`) });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
