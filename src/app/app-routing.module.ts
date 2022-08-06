import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './enum/role.enum';
import { ErrorComponent } from './error/error.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SparepartAddUpComponent } from './sparepart-add-up/sparepart-add-up.component';
import { SparepartComponent } from './sparepart/sparepart.component';
import { UserComponent } from './user/user.component';
// import { RouteGuardService } from './service/route-guard.service';
import { VehicleAddUpComponent } from './vehicle-add-up/vehicle-add-up.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ViewSparepartComponent } from './view-sparepart/view-sparepart.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { LandComponent } from './land/land.component';
import { LandAddUpComponent } from './land-add-up/land-add-up.component';
import { ViewLandComponent  } from './view-land/view-land.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'user/management', component: UserComponent , canActivate:[AuthenticationGuard], data:{role:Role.ADMIN}},
  {path: 'vehicle', component: VehicleComponent},
  {path: 'vehicle/view/:id', component: ViewVehicleComponent},
  {path: 'vehicle/:id', component: VehicleAddUpComponent},
  {path: 'sparepart', component: SparepartComponent},
  {path: 'sparepart/view/:id', component: ViewSparepartComponent},
  {path: 'sparepart/:id', component: SparepartAddUpComponent},
  {path: 'land', component: LandComponent},
  {path: 'land/view/:id', component: ViewLandComponent},
  {path: 'land/:id', component: LandAddUpComponent},
  {path: '', redirectTo:'/login', pathMatch:'full'},

  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
