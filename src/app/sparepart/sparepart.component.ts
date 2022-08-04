import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { SparepartDataServiceService} from '../service/data/sparepart-data-service.service';


export class Sparepart{
  constructor(
    public sparepartId:number,
    public sname:string,
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
    public sCondition:string,
    public accepted:boolean,
    public addedDate:Date,
    public vehicleImages: FileHandle[]
  ){}
}

@Component({
  selector: 'app-Sparepart',
  templateUrl: './Sparepart.component.html',
  styleUrls: ['./Sparepart.component.css']
})


export class SparepartComponent implements OnInit {

  spareparts: Sparepart[] = [];
  // vehicles = [
  //   new Vehicle(1,"Super Vehicle 1",false,new Date()),
  //   new Vehicle(2,"Super Vehicle 2",false,new Date()),
  //   new Vehicle(3,"Super Vehicle 3",false,new Date()),
  //   new Vehicle(4,"Super Vehicle 4",true,new Date()),
  //   new Vehicle(5,"Super Vehicle 5",false,new Date()),
  // ]
  message: string | undefined;
  
  constructor(
    private sparepartService:SparepartDataServiceService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.refreshSpareparts();
  }

  refreshSpareparts(){
    this.sparepartService.getAllSpareparts().subscribe(
      response => {
        console.log(response)
        //console.log(response[0].vehicleImages[0]);
        // let objectUrl = URL.createObjectURL(response[0].vehicleImages[0].file)
        // this.vehicles[0].vehicleImages[0].url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          this.spareparts = response;        
      }
    )
  }

  deleteSparepart(sparepartId: any){
    console.log(`delete vehicle ${sparepartId}`);
    this.sparepartService.deleteSparepart(sparepartId).subscribe(
      response => {
        console.log(response);
        this.message = `Advertisement Deleted Successfully!`
        this.refreshSpareparts();
      }
    )
  }

  updateSparepart(sparepartId:any){
    console.log(`update ${sparepartId}`);
    this.router.navigate(['sparepart',sparepartId]);
  }

  viewSparepart(sparepartId:any){
    this.router.navigate(['sparepart/view',sparepartId]);
  }

  addSparepart(){
    this.router.navigate(['sparepart',-1]);
  }
}

