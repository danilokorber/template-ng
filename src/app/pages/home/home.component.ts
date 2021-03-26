import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage implements OnInit {
  version: string = environment.version;

  constructor() {}

  ngOnInit(): void {}
}
