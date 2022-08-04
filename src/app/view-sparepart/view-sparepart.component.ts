import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { SparepartDataServiceService} from '../service/data/sparepart-data-service.service';


@Component({
  selector: 'app-view-sparepart',
  templateUrl: './view-sparepart.component.html',
  styleUrls: ['./view-sparepart.component.css']
})
export class ViewSparepartComponent implements OnInit {

  sparepartId!: number;
  sparepart: any;

  constructor(
    private sparepartService:SparepartDataServiceService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sparepartId = this.route.snapshot.params['id'];
    this.sparepartService.getSparepart(this.sparepartId).subscribe(
      data => {
        this.sparepart = data
      }
    )
}
deleteSparepart(sparepartId: any){
  console.log(`delete vehicle ${sparepartId}`);
  this.sparepartService.deleteSparepart(sparepartId).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['sparepart']);
    }
  )
}

updateSparepart(sparepartId:any){
  console.log(`update ${sparepartId}`);
  this.router.navigate(['sparepart',sparepartId]);
}
}