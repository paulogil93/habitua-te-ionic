import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {

  items: any = [];
  terms: any = [];

  constructor(private apiService: ApiService, private platform: Platform, private modalController: ModalController) {
    this.initializeItems();
  }

  ngOnInit() { }

  /*
  ** Gets a list of all the products in the database and sorts it.
  */
  initializeItems(): void {
    this.apiService.getAllProducts()
    .then(data => {
      this.items = data;
      this.items.sort((a,b) => a['name'].localeCompare(b['name']));
      this.terms = data;
      this.terms.sort((a,b) => a['name'].localeCompare(b['name']));
      console.log('Products: ', data);
    })
  }

  /*
  ** Copies the unfiltered list to another variable.
  */
  setItems(): void {
    this.items = this.terms;
  }

  /*
  ** Filters a list with a given parameter.
  */
  getItems(ev : any): void {
    this.setItems();
    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /*
  ** Opens the Product Modal to display product info.
  */
  async openDetails(id: number) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: { 'value': id }
    });
    await modal.present();
  }

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
