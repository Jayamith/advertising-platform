import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/app/app.constants';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${APP_URL}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${APP_URL}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.put<User>(`${APP_URL}/user/update`, formData);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.put<User>(`${APP_URL}/user/updateProfileImage`, formData, {reportProgress:true, observe:'events'});
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${APP_URL}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): any {
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users')!);
    }
    return null;
  }

  public createUserFormData(loggedInUsername:any,user:User,profileImage:File):FormData{
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImageUrl', user.profileImageUrl);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNotLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
