import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscriptions:Subscription[] = [];

  constructor(
    private router:Router, 
    private jwtAuthenticationService:JwtAuthenticationService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.jwtAuthenticationService.isLoggedIn()){
      this.router.navigateByUrl('/welcome')
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  public onLogin(user:User): void{
    console.log(user);
    this.subscriptions.push(
      this.jwtAuthenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.jwtAuthenticationService.saveToken(token!);
          this.jwtAuthenticationService.saveUserToLocalCache(response.body!);
          this.router.navigateByUrl('welcome');
        },
        (httpError:HttpErrorResponse) => {
          console.log(httpError);
          this.sendErrorNotification(NotificationType.ERROR, httpError.error.message);
        }
      )
    )
  }
  sendErrorNotification(notificationType: NotificationType, message: string) {
    if(message){
      this.notificationService.notify(notificationType,message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again!');
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
