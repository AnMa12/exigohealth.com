import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {
        const target = document.querySelector('.tw')

        const writer = new Typewriter(target, {
            loop: true,
            typeColor: '#008d8d'
        })

        writer
            .type('Physical rehabilitation made more enjoyable')
            .rest(4000)
            .remove(14)
            .type('easier')
            .rest(4000)
            .remove(6)
            .type('more interactive')
            .rest(4000)
            .remove(16)
            .type('more enjoyable')
            .rest(4000)
            .remove(14)
            .type('easier')
            .rest(4000)
            .remove(6)
            .type('more interactive')
            .rest(4000)
            .remove(16)
            .type('more enjoyable')
            .rest(4000)
            .remove(14)
            .type('easier')
            .rest(4000)
            .remove(6)
            .type('more interactive')
            .rest(4000)
            .remove(16)
            .type('more enjoyable')
            .rest(4000)
            .remove(14)
            .type('easier')
            .rest(4000)
            .remove(6)
            .type('more interactive')
            .rest(4000)
            .start()
    }
}
