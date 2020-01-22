import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage implements OnInit {

  constructor() { }

  /*
  ** Closes the app from the menu.
  */
  ngOnInit() {
    navigator['app'].exitApp();
  }
}
