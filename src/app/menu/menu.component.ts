import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public hardCodedAuthenticationService: HardCodedAuthenticationService,
    public basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

}
