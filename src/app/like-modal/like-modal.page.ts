import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';

@Component({
  selector: 'app-like-modal',
  templateUrl: './like-modal.page.html',
  styleUrls: ['./like-modal.page.scss'],
})
export class LikeModalPage implements OnInit {

  value: any;
  items: any = [];
  results: Array<Object>;

  constructor(private apiService: ApiService, private navParams: NavParams, private modalController: ModalController, private platform: Platform) {
    this.value = this.navParams.get('value');
    this.apiService.getLikesByEvent(this.value)
    .then(data => {
      this.items = data;
      this.getUsers();
      console.log('my likes: ', data);
    })
  }

  ngOnInit() { }

  /*
  ** Gets the users who liked a specific news on the feed.
  */
  private getUsers(): void {
    let array = [];
    for(let item of this.items) {
      console.log("Item: ", item);
      this.apiService.getUserByID(item['user_id'])
      .then(data => {
        let user = data;
        array.push(user);
        console.log('user: ', data)
      })
    }
    this.results = array;
  }

  /*
  ** Opens the Profile Modal page.
  */
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: ProfileModalPage,
      componentProps: { 'value': id }
    });
    await modal.present();
  }

  /*
  ** Dismisses the current modal with backbutton.
  */
  ionViewDidLoad(): void {
    console.log('ionViewDidLoad ModalPage');
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
  }

  /*
  ** Closes the current modal by clicking.
  */
  dismiss(): void {
    this.modalController.dismiss();
  }
}
