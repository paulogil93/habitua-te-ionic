import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';

@Component({
  selector: 'app-attend-modal',
  templateUrl: './attend-modal.page.html',
  styleUrls: ['./attend-modal.page.scss'],
})
export class AttendModalPage implements OnInit {

  attends: any = [];
  items: Array<Object> = [];
  category: string = "go";
  id: number;

  constructor(private apiService: ApiService, private platform: Platform, private modalController: ModalController, private navParams: NavParams) {
    this.id = this.navParams.get('value');
    this.getAttends(this.id);
  }

  ngOnInit() { }

  /*
  ** Closes current modal on click.
  */
  dismiss(): void {
    this.modalController.dismiss();
  }

  /*
  ** Dismisses current modal with backbutton.
  */
  ionViewDidLoad(): void {
    console.log('ionViewDidLoad ModalPage');
    this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
  }

  /*
  ** Calls API Service to get all the Attends(people who answered to an event) from database.
  */
  getAttends(id: number): void {
    this.apiService.getAllAttends(id)
    .then(data => {
      this.attends = data;
      this.setAttends(this.category);
      console.log("Attends: ", data);
    })
  }

  /*
  ** Shows the attends by category.
  */
  setAttends(category: string): void {
    this.items = [];
    this.attends.forEach(element => {
      if(element['will_go'] == category) {
        this.items.push(element);
      }
    });
  }

  /*
  ** Changes the category variable when the segment is changed, then sets the layout. 
  */
  segmentChanged(ev: any): void {
    this.category = ev.detail['value'];
    this.setAttends(this.category);
    console.log('Segment changed: ', ev.detail['value']);
  }

  /*
  ** Opens the Profile Modal Page to show information about an user.  
  */
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: ProfileModalPage,
      componentProps: { 'value': id }
    });
    await modal.present();
  }
}