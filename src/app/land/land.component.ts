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
    public lsize:string,
    public lCondition:string,
    public accepted:boolean,
    public addedDate:Date,
    public landImages: FileHandle[],
    public photos: any[] = []

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
     imgUrl: any;
  
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
        this.lands = response
      //   for (var i = 0; response.length; i++) {
      //     this.lands.push(response[i]);
      //     this.getLandImages(this.lands);
      // }       
      }
    )
  }

  // getLandImages(vland:any){
  //   for(const item of vland){
  //     for(var i = 0; i<item.landImages.length; i++){
  //       this.imgUrl = 'data:image/png;base64,' + item.landImages[i].picByte;
  //       item.photos.push(this.imgUrl);
  //     }
  //   }
  // }
  public searchLand(searchTerm:string):void{
    const results: Land[] = [];
    for(const land of this.lands){
      if(land.lname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
          ){
         results.push(land);
         }
    }
    this.lands = results;
    if( !searchTerm){
      this.refreshLands();
    }
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

