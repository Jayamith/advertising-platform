import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../model/file-handle-model';
import { VehicleDataService } from '../service/data/vehicle-data.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  vehicleId!: number;
  vehicle: any;

  constructor(
    private vehicleDataService: VehicleDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];
    this.vehicleDataService.getVehicle(this.vehicleId).subscribe(
      data => {
        console.log(data)
        this.vehicle = data
        // if(data.vehicleImages.length !== 0){
        //   for(var i=0; i<data.vehicleImages.length; i++){
        //     console.log(data.vehicleImages[i].url)

        //     const fileHandle: FileHandle =  {
        //       file: data.vehicleImages[i].file,
        //       url: this.sanitizer.bypassSecurityTrustUrl(
        //         URL.createObjectURL(data.vehicleImages[i].file)
        //       )
        //     }
        //     console.log(data.vehicleImages[i].file)
        //     this.vehicle.vehicleImages.push(fileHandle);
        //   }
        // }
        console.log(data.vehicleImages)

        // let objectUrl = URL.createObjectURL(response[0].vehicleImages[0].file)
        // this.vehicles[0].vehicleImages[0].url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }
    )
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

updateVehicle(vehicleId:any){
  console.log(`update ${vehicleId}`);
  this.router.navigate(['vehicle',vehicleId]);
}
}