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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscriptions:Subscription[] = [];

  constructor(
    private router:Router, 
    private jwtAuthenticationService:JwtAuthenticationService,
    private notifier:NotificationService) { }

  ngOnInit(): void {
    if(this.jwtAuthenticationService.isLoggedIn()){
      this.router.navigateByUrl('/welcome')
    }
  }

  public onRegister(user:User): void{
    console.log(user);
    this.subscriptions.push(
      this.jwtAuthenticationService.register(user).subscribe(
        (response: User) => {
          this.sendNotification(NotificationType.SUCCESS, `New Account Created ${response.firstName}. Please Log In!`);
          this.router.navigateByUrl('/login');
        },
        (httpError:HttpErrorResponse) => {
          console.log(httpError);
          this.sendNotification(NotificationType.ERROR, httpError.error.message);
        }
      )
    )
  }
  sendNotification(notificationType: NotificationType, message: string) {
    if(message){
      this.notifier.notify(notificationType,message);
    } else {
      this.notifier.notify(notificationType, 'An error occurred. Please try again!');
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
