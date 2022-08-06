import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_URL } from 'src/app/app.constants';
import { Land } from '../../land/land.component';

@Injectable({
  providedIn: 'root'
})
export class LandDataServiceService {
  constructor(
    private http:HttpClient,
    
  ) { }

  
  getAllLands(){
 
    return this.http.get<Land[]>(`${APP_URL}/lands`,);
  }

  deleteLand( id: any){
    return this.http.delete<Land>(`${APP_URL}/lands/${id}`);
  }

  getLand( id: any){
    return this.http.get<Land>(`${APP_URL}/lands/${id}`);
  }

  updateLand( id: any, land: FormData){
    return this.http.put(`${APP_URL}/lands/${id}`,land);
  }

  createLand(land: FormData){
    return this.http.post(`${APP_URL}/land/add`, land);
  }
}
