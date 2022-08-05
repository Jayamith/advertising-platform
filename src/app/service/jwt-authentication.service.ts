import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/app/app.constants';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {
 public host = APP_URL;
 private token: any;
 private loggedInUsername: any;
 private jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  public login(user:User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.host}/user/login`, user, {observe:'response'});
  }

  public register(user:User): Observable<User>{
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public logout(): void{
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token:string): void{
    this.token = token;
    localStorage.setItem('token', token);
  }

  public saveUserToLocalCache(user:User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromCache(): User{
    return JSON.parse(localStorage.getItem('user')!);
  }

  public loadToken(): void{
    this.token = localStorage.getItem('token');
  }

  public getToken(): string{
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
      return false;
    }
    return false;
  }
}
