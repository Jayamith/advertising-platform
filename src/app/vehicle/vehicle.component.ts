import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Role } from '../enum/role.enum';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

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
    public vStatus:string,
    public addedDate:Date,
    public vehicleImages: FileHandle[],
    public photos: any[] = []
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
  temp: any[] = [];
  imgUrl: any;
  singleV: any;
  
  constructor(
    private vehicleService: VehicleDataService,
    private jwtAuthenticationService: JwtAuthenticationService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.refreshVehicles();
  }

  private getUserName():string {
    return this.jwtAuthenticationService.getUserFromCache().firstName;
  }

  refreshVehicles(){
    this.vehicleService.getAllVehicles().subscribe(
      response => {
      //  this.vehicles = response;  
      if(this.isAdmin || this.isUser){
        this.vehicles = response; 
        this.getVehicleImages(this.vehicles);

      } else if(this.isSeller){
        for(var i=0; response.length; i++){
          if(response[i].seller === this.getUserName()){
            this.vehicles.push(response[i]);
            this.getVehicleImages(this.vehicles);

          }
        }
      }  
      }
    )
  }

  getVehicleImages(vlist:any){
    for(var j=1; j<vlist.length; j++){
      for(var k=1; k<vlist[j].vehicleImages.length; k++){
        console.log(vlist[j].vehicleImages[k])
      }
    }
    for(const item of vlist){
      //console.log(item)
      for(var i = 0; i<item.vehicleImages.length; i++){
        //console.log(v1.picByte)
        
        this.imgUrl = 'data:image/png;base64,' + item.vehicleImages[i].picByte;
        item.photos.push(this.imgUrl);
       // console.log(this.imgUrl)

        // item.photos.forEach((element: any) => {
        //   console.log(element)
        // });
      }
    }
    //vlist.pipe(map(val => console.log(val)))
    // vlist.forEach((element: any) => {
    //   console.log(element);
    //   element.vehicleImages.forEach((e: any) => {
    //     console.log(e.picByte)
    //   });
    // });
      // this.singleV = this.vehicles[j];
      // for(var k=0; this.singleV.length; k++){
      //   this.imgUrl = 'data:image/png;base64,' + this.singleV[k].picByte;
      //   console.log(this.imgUrl)
      //   this.temp.push(this.imgUrl);
      // }
 //   }

  }

  public get isAdmin():boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  public get isSeller():boolean {
    return this.getUserRole() === Role.SELLER;
  }

  public get isUser():boolean {
    return this.getUserRole() === Role.USER;
  }

  private getUserRole():string {
    return this.jwtAuthenticationService.getUserFromCache().role; 
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
}





    // this.vehicleService.getAllVehiclesBySeller('Jayamith').subscribe(
    //   response => {
    //     console.log(response)
    //     this.vehicles = response;  

        // for(var i=0; i<response.length; i++){
        //   for(var j=0 ; j<response[i].vehicleImages.length;j++){
        //     console.log(response[i].vehicleImages[j]);
        //     const fileHandle: FileHandle =  {
        //             file: response[i].vehicleImages[j].file,
        //             url: this.sanitizer.bypassSecurityTrustUrl(
        //               URL.createObjectURL(response[i].vehicleImages[j].file)
        //             )
        //           }
        //           console.log(response[i].vehicleImages[j].file)
        //          this.vehicles[i].vehicleImages.push(fileHandle);
        //   }      
        // }
                         // this.vehicle.vehicleImages.push(fileHandle);