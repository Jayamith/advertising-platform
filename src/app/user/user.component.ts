import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';
import { UserDataService } from '../service/data/user-data.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Profile');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[] = [];
  public refreshing: boolean = false;
  private subscriptions: Subscription[] = [];
  public selectedUser!: User;
  public fileName!: string;
  public profileImage!: File;
  public editUser = new User();
  private currentUsername!: string;

  constructor(private userDataService: UserDataService, private notificationService: NotificationService) { }

  ngOnInit(): void {
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
          console.log(response);
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

  sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again!');
    }
  }

}
