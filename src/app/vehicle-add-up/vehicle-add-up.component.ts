import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { Vehicle } from '../vehicle/vehicle.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-vehicle-add-up',
  templateUrl: './vehicle-add-up.component.html',
  styleUrls: ['./vehicle-add-up.component.css']
})
export class VehicleAddUpComponent implements OnInit {

  vehicleId!: number;
  vehicle: Vehicle = {
    vehicleId:0,
    vname:'',
    moreInfo:'',
    email:'',
    contact:'',
    location:'',
    price:'',
    model:'',
    transmission:'',
    seller:'',
    fuelType:'',
    manufacturer:'',
    vCondition:'',
    accepted:false,
    addedDate:new Date(),
    vehicleImages: []
  };

  constructor(
    private vehicleDataService: VehicleDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];
    console.log(this.vehicleId);
    this.vehicle = new Vehicle(this.vehicleId,' ',' ','','','','','','','','','','',false, new Date(),[]);
    if(this.vehicleId!=-1){
      this.vehicleDataService.getVehicle(this.vehicleId).subscribe(
        data => this.vehicle = data
      )
    }
  }

  onFileSelected(event:any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle =  {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.vehicle.vehicleImages.push(fileHandle);
    }
  }

  prepareFormData(vehicle: Vehicle): FormData{
    const formData = new FormData();

    formData.append(
      'vehicle',
      new Blob([JSON.stringify(vehicle)],{type:"application/json"})
    );

    for(var i = 0; i < vehicle.vehicleImages.length; i++){
      formData.append(
        'imageFile',
        vehicle.vehicleImages[i].file,
        vehicle.vehicleImages[i].file.name
      );
    }

    return formData;
  }

  saveVehicle(vehicleForm: NgForm){

    const vehicleFormData = this.prepareFormData(this.vehicle);
    if(this.vehicleId == -1){
      this.vehicleDataService.createVehicle(vehicleFormData)
        .subscribe(
          (data) => {
            console.log(data);
            vehicleForm.reset();
            this.vehicle.vehicleImages = [];
            this.router.navigate(['vehicle']);
          } 
        );
    } else {
      this.vehicleDataService.updateVehicle(this.vehicleId,this.vehicle)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['vehicle']);
          }
        )
    }
  }

  removeImage(i:number){
    this.vehicle.vehicleImages.splice(i,1);
  }

  fileDropped(fileHandle: FileHandle){
    this.vehicle.vehicleImages.push(fileHandle);
  }
}
