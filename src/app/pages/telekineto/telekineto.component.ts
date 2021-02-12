import { Component, OnInit } from '@angular/core';
import '@tensorflow/tfjs-backend-webgl';
import { bindPage, getPoses } from './bind.js';

@Component({
  selector: 'app-telekineto',
  templateUrl: './telekineto.component.html',
  styleUrls: ['./telekineto.component.scss'],
})
export class TelekinetoComponent implements OnInit {
  videoWidth = 600;
  videoHeight = 500;
  constructor() {}
  ngOnInit() {
    bindPage();
  }
}
