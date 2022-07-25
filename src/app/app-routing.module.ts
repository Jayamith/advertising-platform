import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { VehicleAddUpComponent } from './vehicle-add-up/vehicle-add-up.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path: 'vehicle', component: VehicleComponent, canActivate:[RouteGuardService]},
  {path: 'vehicle/view/:id', component: ViewVehicleComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path: 'vehicle/:id', component: VehicleAddUpComponent, canActivate:[RouteGuardService]},

  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
