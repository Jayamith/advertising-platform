
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { LandDataServiceService} from '../service/data/land-data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Land} from '../land/land.component';

@Component({
  selector: 'app-land-add-up',
  templateUrl: './land-add-up.component.html',
  styleUrls: ['./land-add-up.component.css']
})
export class LandAddUpComponent implements OnInit {
  
  landId!: number;
  land: Land= {
    landId:0,
    lname:'',
    moreInfo:'',
    email:'',
    contact:'',
    location:'',
    price:'',
    seller:'',
    lsize:'',
    lCondition:'',
    accepted:false,
    addedDate:new Date(),
    landImages: []
  
     }
     constructor(
      private landService:LandDataServiceService,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer
    ) { }

ngOnInit(): void {
  this.landId = this.route.snapshot.params['id'];
  console.log(this.landId);
  this.land = new Land(this.landId,' ',' ','','','','','','','',false, new Date(),[]);
  if(this.landId!=-1){
    this.landService.getLand(this.landId).subscribe(
      data => this.land = data
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

    this.land.landImages.push(fileHandle);
  }
}

prepareFormData(land: Land): FormData{
  const formData = new FormData();
  console.log(land)

  formData.append(
    'land',
    new Blob([JSON.stringify(land)],{type:"application/json"})
  );

  for(var i = 0; i < land.landImages.length; i++){
    formData.append(
      'imageFile',
      land.landImages[i].file,
      land.landImages[i].file.name
    );
  }

  return formData;
}

saveLand(landForm: NgForm){

  const landFormData = this.prepareFormData(this.land);
 
  if(this.landId == -1){
    this.landService.createLand(landFormData)
      .subscribe(
        (data) => {
          console.log(data);
          landForm.reset();
          this.land.landImages = [];
          this.router.navigate(['land']);
        } 
      );
  } else {
    this.landService.updateLand(this.landId,landFormData)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['land']);
        }
      )
  }
}

removeImage(i:number){
  this.land.landImages.splice(i,1);
}

fileDropped(fileHandle: FileHandle){
  this.land.landImages.push(fileHandle);
}
}

