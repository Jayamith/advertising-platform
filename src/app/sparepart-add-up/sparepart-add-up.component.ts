import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';
import { Vehicle } from '../vehicle/vehicle.component';
import { SparepartDataServiceService} from '../service/data/sparepart-data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sparepart } from '../sparepart/sparepart.component';


@Component({
  selector: 'app-sparepart-add-up',
  templateUrl: './sparepart-add-up.component.html',
  styleUrls: ['./sparepart-add-up.component.css']
})
export class SparepartAddUpComponent implements OnInit {

  sparepartId!: number;
  sparepart: Sparepart = {
    sparepartId:0,
    sname:'',
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
    sCondition:'',
    accepted:false,
    addedDate:new Date(),
    vehicleImages: []
  };

  constructor(
    private sparepartService:SparepartDataServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sparepartId = this.route.snapshot.params['id'];
    console.log(this.sparepartId);
    this.sparepart = new Sparepart(this.sparepartId,' ',' ','','','','','','','','','','',false, new Date(),[]);
    if(this.sparepartId!=-1){
      this.sparepartService.getSparepart(this.sparepartId).subscribe(
        data => this.sparepart = data
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

      this.sparepart.vehicleImages.push(fileHandle);
    }
  }

  prepareFormData(sparepart: Sparepart): FormData{
    const formData = new FormData();
    console.log(sparepart)

    formData.append(
      'sparepart',
      new Blob([JSON.stringify(sparepart)],{type:"application/json"})
    );

    for(var i = 0; i < sparepart.vehicleImages.length; i++){
      formData.append(
        'imageFile',
        sparepart.vehicleImages[i].file,
        sparepart.vehicleImages[i].file.name
      );
    }

    return formData;
  }

  saveSparepart(sparepartForm: NgForm){

    const sparepartFormData = this.prepareFormData(this.sparepart);
   
    if(this.sparepartId == -1){
      this.sparepartService.createSparepart(sparepartFormData)
        .subscribe(
          (data) => {
            console.log(data);
            sparepartForm.reset();
            this.sparepart.vehicleImages = [];
            this.router.navigate(['sparepart']);
          } 
        );
    } else {
      this.sparepartService.updateSparepart(this.sparepartId,this.sparepart)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['sparepart']);
          }
        )
    }
  }

  removeImage(i:number){
    this.sparepart.vehicleImages.splice(i,1);
  }

  fileDropped(fileHandle: FileHandle){
    this.sparepart.vehicleImages.push(fileHandle);
  }
}
