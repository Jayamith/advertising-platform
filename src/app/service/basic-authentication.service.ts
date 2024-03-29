// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs';
// import { APP_URL } from '../app.constants';

// export const TOKEN = 'token';
// export const AUTHENTICATED_USER = 'authenticatedUser';
// @Injectable({
//   providedIn: 'root'
// })
// export class BasicAuthenticationService {

//   constructor(private http:HttpClient) { }

//   executeBasicAuthSrvice(username: string,password: string){

//     let basicAuthHeaderString = 'Basic '+ window.btoa(username+':'+password);

//     let headers = new HttpHeaders({
//       Authorization: basicAuthHeaderString
//     })

//     return this.http.get<AuthenticationBean>(
//       `${APP_URL}/basicauth`,{headers}
//     ).pipe(
//       map(
//         (data: any) => {
//           sessionStorage.setItem(AUTHENTICATED_USER, username);
//           sessionStorage.setItem(TOKEN, basicAuthHeaderString);
//           return data;
//         }
//       )
//     )
//   }

//   getAuthenticatedUser(){
//     return sessionStorage.getItem(AUTHENTICATED_USER);
//   }

//   getAuthenticatedToken(){
//     if(this.getAuthenticatedUser())
//     return sessionStorage.getItem(TOKEN);
//     else
//     return null;
//   }

//   isLoggedIn(){
//     let user = sessionStorage.getItem(AUTHENTICATED_USER);
//     return !(user==null)
//   }

//   logout(){
//     sessionStorage.removeItem(AUTHENTICATED_USER);
//     sessionStorage.removeItem(TOKEN);
//   }
// }

// export class AuthenticationBean {
//   constructor(private message:string){}
// }