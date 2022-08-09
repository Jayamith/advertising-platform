import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../enum/role.enum';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Vehicle } from '../vehicle/vehicle.component';


@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
})
export class ViewVehicleComponent implements OnInit {

  vehicleId!: number;
  vehicle: any;
  retrieveResonse: any;
  retrievedImage: any;
  base64Data: any;
  temp: any[] = [];
  imgUrl: any;


  constructor(
    private vehicleDataService: VehicleDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private jwtAuthenticationService: JwtAuthenticationService,

    ) { }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];
    this.vehicleDataService.getVehicle(this.vehicleId).subscribe(
      data => {
        //console.log(data)
        this.vehicle = data;
        this.getImages();
      }
    )
}

getImages(){
  for(var i=0; this.vehicle.vehicleImages.length; i++){
    this.imgUrl = 'data:image/png;base64,' + this.vehicle.vehicleImages[i].picByte;
    this.temp.push(this.imgUrl);
  }
}

deleteVehicle(vehicleId: any){
  console.log(`delete vehicle ${vehicleId}`);
  this.vehicleDataService.deleteVehicle(vehicleId).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['vehicle']);
    }
  )
}

public get isAdmin():boolean {
  return this.getUserRole() === Role.ADMIN;
}

public get isSeller():boolean {
  return this.getUserRole() === Role.SELLER;
}

public get isUser():boolean {
  return this.isSeller || this.getUserRole() === Role.USER;
}

private getUserRole():string {
  return this.jwtAuthenticationService.getUserFromCache().role; 
}

public getUsername():string {
  return this.jwtAuthenticationService.getUserFromCache().firstName; 
}

updateVehicle(vehicleId:any){
  console.log(`update ${vehicleId}`);
  this.router.navigate(['vehicle',vehicleId]);
}

public createStatusFormData(vehicle:Vehicle):FormData{
  const formData = new FormData();
  formData.append('vStatus', vehicle.vStatus);
  return formData;
}
slideConfig = {
  "slidesToShow": 3, 
  "slidesToScroll": 1, 
  "autoplay": true, 
  "autoplaySpeed": 3000,
  "infinite": true,
  "responsive": [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
updateStatus(statusForm: NgForm){
  const statusFormData = this.createStatusFormData(statusForm.value);
  console.log(statusForm.value)
    this.vehicleDataService.updateStatus(this.vehicleId,statusFormData)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['vehicle']);
        }
      )
  }
}