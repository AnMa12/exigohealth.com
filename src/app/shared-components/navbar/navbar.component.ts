import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;

    constructor() { }

    ngOnInit() {

    }

    scroll(id) {
        const el = document.getElementById(id);
        const yOffset = id === 'vision' ? -230 : -140;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

}
