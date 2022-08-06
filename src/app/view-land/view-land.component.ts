import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandDataServiceService } from '../service/data/land-data-service.service';

@Component({
  selector: 'app-view-land',
  templateUrl: './view-land.component.html',
  styleUrls: ['./view-land.component.css']
})

export class ViewLandComponent implements OnInit {

  landId!: number;
  land: any;
  retrieveResonse: any;
  retrievedImage: any;
  base64Data: any;
  temp: any[] = [];
  imgUrl: any;

  constructor(
    private landDataService: LandDataServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.landId = this.route.snapshot.params['id'];
    this.landDataService.getLand(this.landId).subscribe(
      data => {
        console.log(data)
        this.land = data
        this.getImages();
      }
    )
  }

  getImages(){
    for(var i=0; this.land.landImages.length; i++){
      this.imgUrl = 'data:image/png;base64,' + this.land.landImages[i].picByte;
      this.temp.push(this.imgUrl);
    }
  }

  deleteLand(landId: any) {
    console.log(`delete land ${landId}`);
    this.landDataService.deleteLand(landId).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['land']);
      }
    )
  }

  updateLand(landId: any) {
    console.log(`update ${landId}`);
    this.router.navigate(['land', landId]);
  }
}
