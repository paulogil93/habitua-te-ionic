import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Platform } from '@ionic/angular'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  value: any;
  output: any;
  available: boolean;

  constructor(private apiService: ApiService, private platform: Platform, private modalController: ModalController, private navParams: NavParams) {
    this.value = this.navParams.get('value');
    this.apiService.getProductDetails(this.value)
    .then(data => {
      this.output = data;
      this.available = this.output.available;
      console.log('my product: ', data);
    })
  }

  ngOnInit() { }

  /*
  ** Dismisses current Modal Page with backbutton.
  */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
  }

  /*
  ** Dismisses current Modal Page with a click.
  */
  dismiss() {
    this.modalController.dismiss();
  }

}
