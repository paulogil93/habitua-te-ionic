import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.page.html',
  styleUrls: ['./show-products.page.scss'],
})
export class ShowProductsPage implements OnInit {

  items: any = [];
  favourites: any = [];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };

  constructor(private apiService: ApiService, private modalController: ModalController, private router: Router) {
    this.getCategories();
    this.getFavourites();
  }

  ngOnInit() { }

  /*
  ** Gets the categories from the database.
  */
  async getCategories() {
    await this.apiService.getCategories()
    .then(data => {
      this.items = data;
      console.log("Categories: ", data);
    });
  }

  /*
  ** Gets the favourite products from the database.
  */
  getFavourites() {
    this.apiService.getFavouriteProducts()
    .then(data => {
      this.favourites = data;
      console.log("Favourites: ", data);
    })
  }

  /*
  ** Opens the category by navigating to the products page and passing the category id.
  */
  openCategory(id: number, name: string): void {
    this.router.navigate(['products', {id: id, name: name} ]);
    console.log('myid: ', id);
  }

  /*
  ** Opens the Search Modal Page.
  */
  async presentSearch() {
    const modal = await this.modalController.create({
      component: SearchModalPage
    });
    await modal.present();
  }
}
