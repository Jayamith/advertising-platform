import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
// import { RouteGuardService } from './service/route-guard.service';
import { VehicleAddUpComponent } from './vehicle-add-up/vehicle-add-up.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'user/management', component: UserComponent},
  {path: 'vehicle', component: VehicleComponent},
  {path: 'vehicle/view/:id', component: ViewVehicleComponent},
  {path: 'vehicle/:id', component: VehicleAddUpComponent},
  {path: '', redirectTo:'/login', pathMatch:'full'},

  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
