import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productspage',
  templateUrl: './productspage.component.html',
  styleUrls: ['./productspage.component.scss']
})
export class ProductspageComponent implements OnInit {

  digital_pta_image_src = '../assets/img/digital-pta-image-green.png'
  orthosis_image_src = '../assets/img/orthosis-image-green.png'


  constructor() { }

  ngOnInit(): void {
  }

}
