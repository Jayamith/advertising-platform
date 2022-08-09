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
  imageUrl = "";

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

  slides = [
    {img: "../assets/images/car1.jpg"},
    {img: "../assets/images/car4.jpg"},
    {img: "../assets/images/car5.jpg"},
    {img: "../assets/images/car10.jpg"},
  ];
  // slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "../assets/images/car1.jpg"},)
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }

  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 1, 
    "autoplay": true, 
    "autoplaySpeed": 3000,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
}
