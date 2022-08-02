import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private jwtAuthenticationService: JwtAuthenticationService, private router:Router,
    private notificationService: NotificationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }
  
  private isUserLoggedIn():boolean {
    if(this.jwtAuthenticationService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR,`You need to log in to access this page.`.toUpperCase());
    return false;
  }
}
