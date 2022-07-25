import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router,
    private hardCodedAuthentication: HardCodedAuthenticationService,
    private basicAuthentication: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){
   // if(this.username==='Jayamith' && this.password==='Priyankara'){
    if(this.hardCodedAuthentication.authenticate(this.username, this.password)) {
      this.invalidLogin = false;
      sessionStorage.setItem('authenticatedUser', this.username);
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin(){
    // if(this.username==='Jayamith' && this.password==='Priyankara'){
     this.basicAuthentication.executeBasicAuthSrvice(this.username, this.password)
     .subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error)
        this.invalidLogin = true;
      }
     )
   }
  
}
