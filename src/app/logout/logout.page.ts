import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AuthService } from '../auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private fb: Facebook, private auth: AuthService, private nativeStorage: NativeStorage, private router: Router) { }

  ngOnInit() {
    this.FBLogout();
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
