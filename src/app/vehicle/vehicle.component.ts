import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';

export class Vehicle{
  constructor(
    public vehicleId:number,
    public vname:string,
    public moreInfo:string,
    public email:string,
    public contact:string,
    public location:string,
    public price:string,
    public model:string,
    public transmission:string,
    public seller:string,
    public fuelType:string,
    public manufacturer:string,
    public vCondition:string,
    public accepted:boolean,
    public addedDate:Date,
    public vehicleImages: FileHandle[]
  ){}
}

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})


export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  // vehicles = [
  //   new Vehicle(1,"Super Vehicle 1",false,new Date()),
  //   new Vehicle(2,"Super Vehicle 2",false,new Date()),
  //   new Vehicle(3,"Super Vehicle 3",false,new Date()),
  //   new Vehicle(4,"Super Vehicle 4",true,new Date()),
  //   new Vehicle(5,"Super Vehicle 5",false,new Date()),
  // ]
  message: string | undefined;
  
  constructor(
    private vehicleService: VehicleDataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.refreshVehicles();
  }

  refreshVehicles(){
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        console.log(response)
        this.vehicles = response;   

        for(var i=0; i<response.length; i++){
          for(var j=0 ; j<response[i].vehicleImages.length;j++){
            console.log(response[i].vehicleImages[j]);
            const fileHandle: FileHandle =  {
                    file: response[i].vehicleImages[j].file,
                    url: this.sanitizer.bypassSecurityTrustUrl(
                      URL.createObjectURL(response[i].vehicleImages[j].file)
                    )
                  }
                  console.log(response[i].vehicleImages[j].file)
                 // this.vehicle.vehicleImages.push(fileHandle);
                 this.vehicles[i].vehicleImages.push(fileHandle);
          }      
        }
      }
    )
  }

  deleteVehicle(vehicleId: any){
    console.log(`delete vehicle ${vehicleId}`);
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      response => {
        console.log(response);
        this.message = `Advertisement Deleted Successfully!`
        this.refreshVehicles();
      }
    )
  }

  updateVehicle(vehicleId:any){
    console.log(`update ${vehicleId}`);
    this.router.navigate(['vehicle',vehicleId]);
  }

  viewVehicle(vehicleId:any){
    this.router.navigate(['vehicle/view',vehicleId]);
  }

  addVehicle(){
    this.router.navigate(['vehicle',-1]);
  }
}
