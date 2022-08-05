// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BasicAuthenticationService } from '../basic-authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpIntercepterBasicAuthService implements HttpInterceptor{

//   constructor(private basicAuthenticationService: BasicAuthenticationService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler){
//     //let uname = 'Jayamith';
//     //let password = 'Priyankara';
//     //let basicAuthHeaderString = 'Basic '+ window.btoa(uname+':'+password);

//     let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
//     let username = this.basicAuthenticationService.getAuthenticatedUser();

//     if(basicAuthHeaderString && username){
//       request = request.clone({
//         setHeaders : {
//           Authorization: basicAuthHeaderString!
//         }
//       })
//     }
//     return next.handle(request);
//   }
// }
