import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {

  features_list = [
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
      },
      {
          title: "Connected",
          icon: "E",
          content: "Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh, nullam mollis. Ut justo. Suspendisse potenti."
      },
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
