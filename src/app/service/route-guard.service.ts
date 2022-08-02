// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { HardCodedAuthenticationService } from './hard-coded-authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService implements CanActivate{

//   constructor(
//     private hardCodedAuthenticationService: HardCodedAuthenticationService,
//     private router: Router
//   ) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//     if(this.hardCodedAuthenticationService.isLoggedIn())
//       return true;

//     this.router.navigate(['login'])
//     return false;
//   };

// }
