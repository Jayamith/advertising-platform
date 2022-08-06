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

  getAllVehiclesBySeller(seller:any){
    return this.http.get<Vehicle[]>(`${APP_URL}/vehiclesBySeller`,/* {headers}*/);
  }

  deleteVehicle( id: any){
    return this.http.delete<Vehicle>(`${APP_URL}/vehicles/${id}`);
  }

  getVehicle( id: any){
    return this.http.get<Vehicle>(`${APP_URL}/vehicles/${id}`);
  }

  updateVehicle( id: any, vehicle: FormData){
    return this.http.put(`${APP_URL}/vehicles/${id}`, vehicle);
  }

  updateStatus( id: any, vehicle: FormData){
    return this.http.put(`${APP_URL}/vehicle/status/${id}`, vehicle);
  }

  createVehicle(vehicle: FormData){
    return this.http.post(`${APP_URL}/vehicle/add`, vehicle);
  }


}
