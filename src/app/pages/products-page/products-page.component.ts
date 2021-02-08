import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

    digital_pta_image_src = '../assets/img/digital-pta-image-green.png'
    orthosis_image_src = '../assets/img/orthosis-image-green.png'

    product_details = false

    constructor() { }

    ngOnInit(): void {

    }

    change_product() {
        this.product_details = !this.product_details 
        this.digital_pta_image_src = '../assets/img/digital-pta-image-green.png'
        this.orthosis_image_src = '../assets/img/orthosis-image-green.png'
    }
}
