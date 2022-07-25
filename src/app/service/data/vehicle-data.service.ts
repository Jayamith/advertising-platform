import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_URL } from 'src/app/app.constants';

import { Vehicle } from '../../vehicle/vehicle.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {

  constructor(
    private http:HttpClient,
    
  ) { }

  getAllVehicles(){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })
    return this.http.get<Vehicle[]>(`${APP_URL}/vehicles`,/* {headers}*/);
  }

  deleteVehicle( id: any){
    return this.http.delete<Vehicle>(`${APP_URL}/vehicles/${id}`);
  }

  getVehicle( id: any){
    return this.http.get<Vehicle>(`${APP_URL}/vehicles/${id}`);
  }

  updateVehicle( id: any, vehicle: any){
    return this.http.put(`${APP_URL}/vehicle/update/${id}`, vehicle);
  }

  createVehicle(vehicle: FormData){
    return this.http.post(`${APP_URL}/vehicle/add`, vehicle);
  }

  // createBasicAuthenticationHttpHeader(){
  //   let uname = 'Jayamith';
  //   let password = 'Priyankara';
  //   let basicAuthHeaderString = 'Basic '+ window.btoa(uname+':'+password);
  //   return basicAuthHeaderString;
  // }
}
