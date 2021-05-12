import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class RootLayout implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
