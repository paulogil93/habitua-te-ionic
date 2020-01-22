import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { TermsModalPage } from '../terms-modal/terms-modal.page'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /*
  ** Details object to store all the info from Facebook API.
  */
  details: Object = {
    id: "",
    name: "",
    email: "",
    profile_pic: ""
  }

  constructor(
    private router: Router,
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    private auth: AuthService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private modalController: ModalController
    ) { }

  ngOnInit() { }
  
  /*
  ** Calls Facebook API to login a user:
  ** It retrieves basic info (name, email and profile picture).
  ** Check https://github.com/paulogil93/ionic-facebook-login for more info about Facebook Login on Ionic.
  ** Saves Login data on Platform Storage.
  */
  async Login() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    const permissions = ['public_profile', 'email'];

    this.fb.login(permissions)
    .then(response => {
      let userID = response.authResponse.userID;
      this.fb.api('me?fields=name,email', permissions)
      .then(user => {
        user.picture = "https://graph.facebook.com/" + userID + "/picture?type=normal";

        this.details['name'] = user.name;
        this.details['email'] = user.email;
        this.details['profile_pic'] = user.picture;
        this.auth.setUserDetails(this.details);
        this.postUser();
        this.nativeStorage.setItem('user', this.details)
        .then(() => {
          this.auth.setIsLoggedIn(true);
          this.router.navigate(['/loading']);
          loading.dismiss();
        }, error => {
          console.log(error);
          loading.dismiss();
        })
      })
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  /*
  ** POSTs user info to database after a successful login:
  ** It saves data only the first time the user logs in.
  */
  async postUser() {
    await this.apiService.postUser(this.auth.getName(), this.auth.getEmail(), this.auth.getPicture())
    .then(data => {
      console.log(data);
      this.details['id'] = data['id'];
      this.auth.setUserID(data['id']);
      this.auth.setUserDetails(this.details);
      this.nativeStorage.setItem('user', this.auth.getUserDetails());
    });
  }

  /*
  ** Opens the Terms and Conditions Modal Page.
  */
  async presentModal() {
    const modal = await this.modalController.create({
      component: TermsModalPage,
      componentProps: {}
    });
    await modal.present();
  }

  /*
  ** Presents a Loading Controller while user is logging in.
  */
  async presentLoading(loading) {
		return await loading.present();
  }
}
