import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Vehicle } from '../vehicle/vehicle.component';

@Component({
  selector: 'app-view-vehicle-list-user',
  templateUrl: './view-vehicle-list-user.component.html',
  styleUrls: ['./view-vehicle-list-user.component.css']
})
export class ViewVehicleListUserComponent implements OnInit {

  vehicles: Vehicle[] = [];
  cars: Vehicle[] = [];
  buses: Vehicle[] = [];
  vans: Vehicle[] = [];

  message: string | undefined;
  temp: any[] = [];
  imgUrl: any;
  singleV: any;

  constructor(private vehicleService: VehicleDataService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private router: Router,
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.refreshVehicles();

  }

  refreshVehicles() {
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        for (var i = 0; response.length; i++) {
          if (response[i].vStatus === 'approved') {
            if(response[i].vname === 'Car'){
                this.cars.push(response[i]);
                this.getVehicleImages(this.cars);
            } else if(response[i].vname === 'Van'){
                this.vans.push(response[i]);
                this.getVehicleImages(this.vans);
            } else if(response[i].vname === 'Bus'){
                this.buses.push(response[i]);
                this.getVehicleImages(this.buses);
            } else {
                this.vehicles.push(response[i]);
                this.getVehicleImages(this.vehicles);
            }
          }
        }
      }
    )
  }

  getVehicleImages(vlist:any){
    for(const item of vlist){
      for(var i = 0; i<item.vehicleImages.length; i++){
        this.imgUrl = 'data:image/png;base64,' + item.vehicleImages[i].picByte;
        item.photos.push(this.imgUrl);
      }
    }
  }

  public searchVehicles(searchTerm:string):void{
    const results: Vehicle[] = [];
    // const allvehicles = this.cars.concat(this.vans,this.buses);
    for(const vehicle of this.vehicles){
      if(vehicle.vname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
         vehicle.model.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          ){
         results.push(vehicle);
         }
    }
    this.vehicles = results;
    if( !searchTerm){
      this.refreshVehicles();
    }
  }

  viewVehicle(vehicleId:any){
    this.router.navigate(['vehicle/view',vehicleId]);
  }
}
