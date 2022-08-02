import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuthenticationService } from '../jwt-authentication.service';

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {

  constructor(private jwtAuthenticationService: JwtAuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.jwtAuthenticationService.host}/user/login`)){
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.jwtAuthenticationService.host}/user/register`)){
      return httpHandler.handle(httpRequest);
    }
    this.jwtAuthenticationService.loadToken();
    const token = this.jwtAuthenticationService.getToken();
    const request = httpRequest.clone({setHeaders: { Authorization: `Bearer ${token}`}});
    return httpHandler.handle(request);
  }
}
