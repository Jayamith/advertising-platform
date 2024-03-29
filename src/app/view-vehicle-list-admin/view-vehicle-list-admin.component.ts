import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Vehicle } from '../vehicle/vehicle.component';

@Component({
  selector: 'app-view-vehicle-list-admin',
  templateUrl: './view-vehicle-list-admin.component.html',
  styleUrls: ['./view-vehicle-list-admin.component.css']
})
export class ViewVehicleListAdminComponent implements OnInit {
  vehicles: Vehicle[] = [];
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
            this.vehicles.push(response[i]);
            this.getVehicleImages(this.vehicles);
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
