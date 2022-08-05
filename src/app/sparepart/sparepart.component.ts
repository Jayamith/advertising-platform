import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { SparepartDataService } from '../service/data/sparepart-data.service';


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
  selector: 'app-sparepart',
  templateUrl: './sparepart.component.html',
  styleUrls: ['./sparepart.component.css']
})


export class SparepartComponent implements OnInit {

  spareparts: Sparepart[] = [];

  message: string | undefined;
  
  constructor(
    private sparepartService: SparepartDataService,
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