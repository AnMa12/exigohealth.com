import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-benefits-page',
  templateUrl: './benefits-page.component.html',
  styleUrls: ['./benefits-page.component.scss']
})
export class BenefitsPageComponent implements OnInit {

    @Input() isOrthosis: boolean;

    features_list_dpt = [
        {
            title: "Faster",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        },
        {
            title: "Faster",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        },
        {
            title: "Connected",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        }
    ]

    features_list_orthosis = [
        {
            title: "Faster",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        },
        {
            title: "Faster",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        },
        {
            title: "Connected",
            icon: "E",
            content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
        }
    ]



  constructor() { }

  ngOnInit(): void {
  }

}
