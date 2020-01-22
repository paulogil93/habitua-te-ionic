import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  id: any;
  name: any;
  products: Array<Object> = [];
  items: any;

  constructor(private actionSheetController: ActionSheetController, private apiService: ApiService, private activatedRoute: ActivatedRoute, private modalController: ModalController) {
    this.setVars();
    this.getProducts(this.id);
  }

  ngOnInit() { }

  /*
  ** Gets all the products of a given category id.
  */
  getProducts(id: number): void {
    this.apiService.getProducts(id)
    .then(data => {
      this.items = data;
      console.log("Products: ", data);
    })
  }

  /*
  ** Gets the passed variables from previous page.
  */
  setVars(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
  }

  /*
  ** Sorts the list of products by a given parameter(name, price or proof).
  */
  sortProducts(order: string): void {
    this.products = this.items;
    this.products.sort((a,b) => a[order].localeCompare(b[order]));
    this.items = this.products;
  }

  /*
  ** Presents an Action Sheet to choose the parameter of sorting.
  */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ordenar por:',
      buttons: [{
        text: 'Nome',
        icon: 'quote',
        handler: () => {
          this.sortProducts('name');
          console.log('Order by name.');
        }
      },
      {
        text: 'Álcool',
        icon: 'stats',
        handler: () => {
          this.sortProducts('proof');
          console.log('order by proof.');
        }
      },
      {
        text: 'Preço',
        icon: 'logo-euro',
        handler: () => {
          this.sortProducts('price');
          console.log('Order by price.');
        }
      }]
    });
    await actionSheet.present();
  }

  /*
  ** Opens a Modal Page to show product informaion.
  */
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: { 'value': id }
    });
    await modal.present();
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
