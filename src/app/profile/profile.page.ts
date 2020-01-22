import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items: any = [];
  products: any = [];
  userInfo: Object;
  product_id: number;
  product: Object;
  favourite_id: number = 0;

  constructor(private auth: AuthService, private apiService: ApiService, private fb: Facebook, private nativeStorage: NativeStorage, private router: Router) {
    this.getUserInfo();
    this.getFavourites();
    this.getProducts();
  }

  ngOnInit() { }

  /*
  ** Gets the current user info.
  */
  getUserInfo(): void {
    this.apiService.getUserByID(this.auth.getUserID())
    .then(data => {
      this.userInfo = data;
      console.log("USER: ", data);
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
  ** Gets the favourites of the current user.
  */
  getFavourites() {
    this.apiService.getFavouritesByUserID(this.auth.getUserID())
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
    })
  }

  /*
  ** Gets the selected value of the component.
  */
  selectChanged(ev: any) {
    this.product_id = ev.detail['value'];
    console.log('Segment changed: ', ev.detail['value']);
  }

  /*
  ** Calls API to PUT favourite in the database.
  */
  putFavourite(): void {
    this.apiService.putFavourite(this.favourite_id, this.auth.getUserID(), this.product_id)
    .then(data => {
      console.log(data);
      this.getFavourites();
    })
  }

  /*
  ** Ends current Facebook session:
  ** Clears the login data from Native Storage.
  ** Redirects to /login page.
  */
  FBLogout() {
    this.fb.logout().then( logoutRes => {
      this.auth.setIsLoggedIn(false);
      this.auth.setUserDetails(null);
      this.nativeStorage.clear();
    }).catch( logoutErr => {
      console.log(logoutErr);
    })
    this.router.navigateByUrl("/login");
  }
}