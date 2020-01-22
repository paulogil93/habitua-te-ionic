import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';
import { ModalPagePage } from '../modal-page/modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes) 
  ],
  declarations: [ProductsPage],
  //entryComponents: [ModalPagePage]
})

export class ProductsPageModule {}

