import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { FileUploadStatus } from '../model/file-upload-status';
import { User } from '../model/user';
import { UserDataService } from '../service/data/user-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user!: User;
  private subscriptions: Subscription[] = [];
  public currentUsername: any;
  public fileName!: string;
  public profileImage!: File;
  public refreshing: boolean = false;
  public users: User[] = [];
  public fileStatus = new FileUploadStatus();

  constructor(private userDataService: UserDataService, 
    private notificationService: NotificationService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = this.jwtAuthenticationService.getUserFromCache();
  }

  
  public get isAdmin():boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  public get isSeller():boolean {
    return this.getUserRole() === Role.SELLER;
  }

  public get isUser():boolean {
    return this.getUserRole() === Role.USER;
  }

  private getUserRole():string {
    return this.jwtAuthenticationService.getUserFromCache().role; 
  }
  public getUsers(showNotification: boolean) {
    this.refreshing = true;
    this.subscriptions.push(
      this.userDataService.getUsers().subscribe(
        (response: any) => {
          this.userDataService.addUsersToLocalCache(response);
              this.users = response;
              this.refreshing = false;
              if (showNotification) {
                this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully!`);
              }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again!');
    }
  }

  public onProfileImageChange(event:any){
    this.fileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
  }

  public onUpdateProfileImage(){
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImage', this.profileImage);
    this.subscriptions.push(
      this.userDataService.updateProfileImage(formData).subscribe(
        (event: HttpEvent<any>) => {
          this.reportUploadProgress(event);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.fileStatus.status = 'done';
        }
      )
    );
  }
  private reportUploadProgress(event: HttpEvent<any>): void {
    switch(event.type){
      case HttpEventType.UploadProgress:
        this.fileStatus.percentage = Math.round(100 * event.loaded / event.total!);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if(event.status === 200){
          this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getMilliseconds()}`
          this.sendNotification(NotificationType.SUCCESS, `Profile image updated successfully!`);
          this.fileStatus.status = 'done';
          break;
        } else {
          this.sendNotification(NotificationType.ERROR, `Unable to upload the image. Please try again!`);
          break;
        }
      default:
        `Finished all processes`
    }
  }

  public updateProfileImage(): void{
    document.getElementById('profile-image-input')?.click();
  }

  public onLogOut():void{
    this.jwtAuthenticationService.logout();
    this.router.navigateByUrl('/login');
    this.sendNotification(NotificationType.SUCCESS, `You 've been logged out successfully!`);
  }
  
  public onUpdateCurrentUser(user: User):void {
    this.currentUsername = this.jwtAuthenticationService.getUserFromCache().username;
    const formData = this.userDataService.createUserFormData(this.currentUsername, user, this.profileImage);
    this.subscriptions.push(
      this.userDataService.updateUser(formData).subscribe(
        (response: any) => {
          this.jwtAuthenticationService.saveUserToLocalCache(response);
          this.getUsers(false);
          this.profileImage = null!;
          this.fileName = null!;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} updated successfully!`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null!;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
