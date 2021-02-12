import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

    team = [
        {
            image: "../assets/img/team-ana.png",
            name: "Ana-Maria Melinte",
            role: "CEO",
            mail: "anamaria.melinte@exigohealth.com"
        },
        {
            image: "../assets/img/team-irina.png",
            name: "Irina Sargu",
            role: "COO",
            mail: "irina.sargu@exigohealth.com"
        },
        {
            image: "../assets/img/team-ioana.png",
            name: "Ioana Ciripan",
            role: "CTO",
            mail: "ioana.ciripan@exigohealth.com"
        },
    ]

    constructor() {

    }

    ngOnInit(): void {

    }

}
