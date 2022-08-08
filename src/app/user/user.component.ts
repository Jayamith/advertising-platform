import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';
import { UserDataService } from '../service/data/user-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<string>('Profile');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[] = [];
  public user!: User;
  public refreshing: boolean = false;
  private subscriptions: Subscription[] = [];
  public selectedUser!: User;
  public fileName!: string;
  public profileImage!: File;
  public editUser = new User();
  private currentUsername!: string;

  constructor(private userDataService: UserDataService, 
    private notificationService: NotificationService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = this.jwtAuthenticationService.getUserFromCache();
    this.getUsers(true);
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean) {
    this.refreshing = true;
    this.subscriptions.push(
      this.userDataService.getUsers().subscribe(
        (response: any) => {
          this.userDataService.addUsersToLocalCache(response);
            if(this.isAdmin){
              this.users = response;
              this.refreshing = false;
              if (showNotification) {
                this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully!`);
              }
            } else {
              for(var i=0; response.length; i++){
                if(response[i].firstName === this.getUserName()){
                  this.users.push(response[i]);
                  this.refreshing = false;
                }
              }
            }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public onSelectUser(selectedUser: User){
    this.selectedUser = selectedUser;
    document.getElementById('openUserInfo')?.click();
  }

  public onProfileImageChange(event:any){
    this.fileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
  }

  public saveNewUser():void{
    document.getElementById('new-user-save')?.click();
  }

  public onAddNewUser(userForm:NgForm): void{
    const formData = this.userDataService.createUserFormData(null, userForm.value, this.profileImage);
    this.subscriptions.push(
      this.userDataService.addUser(formData).subscribe(
        (response: any) => {
          console.log(response);
          document.getElementById('new-user-close')?.click();
          this.getUsers(false);
          this.profileImage = null!;
          this.fileName = null!;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `Account created for ${response.firstName}!`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null!;
        }
      )
    );
  }

  public searchUsers(searchTerm:string):void{
    const results: User[] = [];
    for(const user of this.userDataService.getUsersFromLocalCache()){
      if(user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
         user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
         user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
         user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ){
         results.push(user);
         }
    }
    this.users = results;
    if(results.length === 0 || !searchTerm){
      this.users = this.userDataService.getUsersFromLocalCache();
    }
  }

  public onEditUser(editUser: User):void{
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    document.getElementById('openUserEdit')?.click();
  }

  public onUpdateUser():void{
    const formData = this.userDataService.createUserFormData(this.currentUsername, this.editUser, this.profileImage);
    this.subscriptions.push(
      this.userDataService.updateUser(formData).subscribe(
        (response: any) => {
          console.log(response);
          document.getElementById('closeEditUserModalButton')?.click();
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

  public onDeleteUser(userId:number): void{
    this.subscriptions.push(
      this.userDataService.deleteUser(userId).subscribe(
        (response: any) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(true);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
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

  private getUserName():string {
    return this.jwtAuthenticationService.getUserFromCache().firstName;  }

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
