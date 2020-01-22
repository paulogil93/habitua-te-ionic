import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './auth.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private ONESIGNAL_APP_ID: "ONE SIGNAL APP ID";
  private GOOGLE_PROJECT_NUMBER: "GOOGLE PROJETC NUMBER";

  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Eventos',
      url: '/show-events',
      icon: 'time'
    },
    {
      title: 'Produtos',
      url: '/show-products',
      icon: 'cafe'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Sobre',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Terminar sessão',
      url: '/logout',
      icon: 'log-out'
    },
    {
      title: 'Sair',
      url: '/close',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: NativeStorage,
    private router: Router,
    private auth: AuthService,
    private alertController: AlertController,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  /*
  ** Searches Native Storage for Login details:
  ** If there is no login details, redirects to /login Page. 
  */
  initializeApp() {
    this.platform.ready().then(() => {
      let env = this;
      this.storage.getItem('user').then( async function(data) {
        env.auth.setUserDetails(data);
        env.auth.setIsLoggedIn(true);
        env.router.navigateByUrl('/home');
        env.splashScreen.hide();
      }, function(error) {
        env.router.navigateByUrl('/login');
        env.splashScreen.hide();
      });
      env.statusBar.styleDefault();
      if(this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  /*
  ** Sets up the OneSignal Service (push notifications).
  */
  setupPush() {
    this.oneSignal.startInit(this.ONESIGNAL_APP_ID, this.GOOGLE_PROJECT_NUMBER);
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    this.oneSignal.endInit();
  }

  /*
  ** Opens the alert of the OneSignal push notification service.
  */
  async showAlert(title, msg, task) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    })
    await alert.present();
  }
}