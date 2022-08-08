import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ErrorComponent } from './error/error.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehicleAddUpComponent } from './vehicle-add-up/vehicle-add-up.component';
// import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDirective } from './dir/drag.directive';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { UserDataService } from './service/data/user-data.service';
import { JwtAuthenticationService } from './service/jwt-authentication.service';
import { AuthJwtInterceptor } from './service/http/auth-jwt.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SparepartComponent } from './sparepart/sparepart.component';
import { ViewSparepartComponent } from './view-sparepart/view-sparepart.component';
import { SparepartAddUpComponent } from './sparepart-add-up/sparepart-add-up.component';
import { LandAddUpComponent } from './land-add-up/land-add-up.component';
import { LandComponent } from './land/land.component';

import { ViewLandComponent } from './view-land/view-land.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewVehicleListUserComponent } from './view-vehicle-list-user/view-vehicle-list-user.component';
import { ViewVehicleListAdminComponent } from './view-vehicle-list-admin/view-vehicle-list-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorComponent,
    VehicleComponent,
    FooterComponent,
    VehicleAddUpComponent,
    DragDirective,
    ViewVehicleComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    MenuComponent,
    SparepartComponent,
    ViewSparepartComponent,
    SparepartAddUpComponent,
    LandAddUpComponent,
    LandComponent,

    ViewLandComponent,
      UserProfileComponent,
      ViewVehicleListUserComponent,
      ViewVehicleListAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    NgxTypedJsModule,
    MatSelectModule,
    NotificationModule,
    SlickCarouselModule
  ],
  providers: [
    NotificationService,AuthenticationGuard,UserDataService, JwtAuthenticationService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true}
    //{provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
