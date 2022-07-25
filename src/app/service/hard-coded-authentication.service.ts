import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  constructor() { }

  authenticate(username: string,password: string){
    if(username==='Jayamith' && password==='Priyankara'){
      return true;
    }
    return false;
  }

  isLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user==null)
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }
}
