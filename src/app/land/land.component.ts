import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { LandDataServiceService} from '../service/data/land-data-service.service';


export class Land  {

  constructor( 
    public landId:number,
    public lname:string,
    public moreInfo:string,
    public email:string,
    public contact:string,
    public location:string,
    public price:string,
   
    
    public seller:string,
    
    public size:string,
    public lCondition:string,
    public accepted:boolean,
    public addedDate:Date,
    public landImages: FileHandle[]
  ){}

   }
   @Component({
    selector: 'app-land',
    templateUrl: './land.component.html',
    styleUrls: ['./land.component.css']
  })

 

export class LandComponent implements OnInit {

  lands: Land[] = [];

  message: string | undefined;
  
  constructor(
    private landService:  LandDataServiceService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.refreshLands();
  }

  refreshLands(){
    this.landService.getAllLands().subscribe(
      response => {
        console.log(response)
        ;
          this.lands = response;        
      }
    )
  }

  deleteLand(landId: any){
    console.log(`delete land ${landId}`);
    this.landService.deleteLand(landId).subscribe(
      (      response: any) => {
        console.log(response);
        this.message = `Advertisement Deleted Successfully!`
        this.refreshLands();
      }
    )
  }

  updateLand(landId:any){
    console.log(`update ${landId}`);
    this.router.navigate(['land',landId]);
  }

  viewLand(landId:any){
    this.router.navigate(['land/view',landId]);
  }

  addLand(){
    this.router.navigate(['land',-1]);
  }
}

