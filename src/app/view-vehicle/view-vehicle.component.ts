import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
    ) { }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];
    this.vehicleDataService.getVehicle(this.vehicleId).subscribe(
      data => {
        this.vehicle = data
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