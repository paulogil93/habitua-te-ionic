import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private router: Router, private loadingController: LoadingController) {
    this.presentLoading();
  }

  ngOnInit() { }

  /*
  ** Presents the loading animation:
  ** Creates a delay between Facebook Login and loading of the Home Page.
  */
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'A iniciar sessão...',
      duration: 5000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    this.router.navigateByUrl('/home');
  }

}
