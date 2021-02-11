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
            mail: "anma.melinte@gmail.com"
        },
        {
            image: "../assets/img/team-irina.png",
            name: "Irina Sargu",
            role: "COO",
            mail: "irina.s.sargu@gmail.com"
        },
        {
            image: "../assets/img/team-ioana.png",
            name: "Ioana Ciripan",
            role: "CTO",
            mail: "ioanarciripan@gmail.com"
        },
    ]

    constructor() {

    }

    ngOnInit(): void {

    }

}
