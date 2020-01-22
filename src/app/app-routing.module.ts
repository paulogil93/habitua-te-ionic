import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'products', loadChildren: './products/products.module#ProductsPageModule'},
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule'},
  { path: 'search-modal', loadChildren: './search-modal/search-modal.module#SearchModalPageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'show-events', loadChildren: './show-events/show-events.module#ShowEventsPageModule' },
  { path: 'show-products', loadChildren: './show-products/show-products.module#ShowProductsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'like-modal', loadChildren: './like-modal/like-modal.module#LikeModalPageModule' },
  { path: 'attend-modal', loadChildren: './attend-modal/attend-modal.module#AttendModalPageModule' },
  { path: 'loading', loadChildren: './loading/loading.module#LoadingPageModule' },
  { path: 'profile-modal', loadChildren: './profile-modal/profile-modal.module#ProfileModalPageModule' },
  { path: 'terms-modal', loadChildren: './terms-modal/terms-modal.module#TermsModalPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'close', loadChildren: './close/close.module#ClosePageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
