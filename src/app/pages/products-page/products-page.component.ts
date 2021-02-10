import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

    isOrthosis = false;

    constructor() { }

    ngOnInit(): void {

    }

    change_product() {
        this.isOrthosis = !this.isOrthosis 
    }
}
