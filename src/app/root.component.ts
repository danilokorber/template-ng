import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class RootComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
