import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public username:any;

  constructor(private router:Router,
    public jwtAuthenticationService: JwtAuthenticationService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    if(this.jwtAuthenticationService.isLoggedIn()){
      this.username = this.jwtAuthenticationService.getUserFromCache().username; 
    }
  }

  public get isAdmin():boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  public get isSeller():boolean {
    return this.isAdmin || this.getUserRole() === Role.SELLER;
  }

  public get isUser():boolean {
    return this.isSeller || this.getUserRole() === Role.USER;
  }

  private getUserRole():string {
    return this.jwtAuthenticationService.getUserFromCache().role; 
  }

  sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again!');
    }
  }

  public onLogOut():void{
    this.jwtAuthenticationService.logout();
    this.router.navigateByUrl('/login');
    this.sendNotification(NotificationType.SUCCESS, `You 've been logged out successfully!`);
  }
}
