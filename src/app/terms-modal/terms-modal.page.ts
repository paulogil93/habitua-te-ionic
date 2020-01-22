import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.page.html',
  styleUrls: ['./terms-modal.page.scss'],
})
export class TermsModalPage implements OnInit {

  constructor(private modalController: ModalController, private platform: Platform) { }

  ngOnInit() { }

  /*
  ** Dismisses the current Modal with backbutton.
  */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
  }

  /*
  ** Dismisses the current Modal by clicking.
  */
  dismiss() {
    this.modalController.dismiss();
  }
}