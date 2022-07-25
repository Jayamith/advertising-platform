import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  constructor(
    private router: ActivatedRoute,
    private service: WelcomeDataService,
    ) { }

  ngOnInit(): void {
    this.name = this.router.snapshot.params['name'];
  }

  getWelcomeMessage(){
    this.service.executeHelloWorldBeanService();
   // console.log("Get Welcome Message");
  }
}
