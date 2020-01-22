import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavParams, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.page.html',
  styleUrls: ['./profile-modal.page.scss'],
})
export class ProfileModalPage implements OnInit {

  value: number;
  user: Object = {};
  products: any = [];
  items: any = []
  product: Object;
  favourite_id: number;

  constructor(private apiService: ApiService, private navParams: NavParams, private modalController: ModalController, private platform: Platform) {
    this.value = this.navParams.get('value');
    this.getUser(this.value);
    this.getProducts();
    this.getFavourites(this.value);
  }

  ngOnInit() { }

  /*
  ** Gets user info by its id.
  */
  getUser(id: number): void {
    this.apiService.getUserByID(id)
    .then(data => {
      this.user = data;
      console.log("User: ", data);
    })
  }

  /*
  ** Gets a list of all the products.
  */
  getProducts(): void {
    this.apiService.getAllProducts()
    .then(data => {
      this.products = data;
      console.log("products: ", data);
    })
  }

  /*
  ** Gets the favourites of a user by its id.
  */
  getFavourites(id: number): void {
    this.apiService.getFavouritesByUserID(id)
    .then(data => {
      this.items = data;
      this.product = data;
      if(this.items.length == 0) {
        this.product = {
          favourite_id: 0,
          product_pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Icon_None.svg/100px-Icon_None.svg.png",
          product_name: "Nenhum"
        }
      } else {
        this.favourite_id = data[0]['id'];
        this.product = {
          product_pic: data[0]['product_pic'],
          product_name: data[0]['product_name']
        }
      }
      console.log("PRODUCT: ", this.product);
      console.log("INFO: ", data);
    })
  }

  /*
  ** Dismisses the current Modal with backbutton
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