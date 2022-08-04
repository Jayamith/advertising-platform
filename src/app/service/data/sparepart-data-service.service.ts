import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_URL } from 'src/app/app.constants';

import { Sparepart } from '../../sparepart/sparepart.component';

@Injectable({
  providedIn: 'root'
})
export class   SparepartDataServiceService{

  constructor(
    private http:HttpClient,
    
  ) { }

  getAllSpareparts(){
 
    return this.http.get<Sparepart[]>(`${APP_URL}/spareparts`,/* {headers}*/);
  }

  deleteSparepart( id: any){
    return this.http.delete<Sparepart>(`${APP_URL}/spareparts/${id}`);
  }

  getSparepart( id: any){
    return this.http.get<Sparepart>(`${APP_URL}/spareparts/${id}`);
  }

  updateSparepart( id: any, sparepart: any){
    return this.http.put(`${APP_URL}/spareparts/${id}`, sparepart);
  }

  createSparepart(sparepart: FormData){
    return this.http.post(`${APP_URL}/sparepart/add`, sparepart);
  }

 
}
