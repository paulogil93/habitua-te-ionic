import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendModalPage } from '../attend-modal/attend-modal.page';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.page.html',
  styleUrls: ['./show-events.page.scss'],
})
export class ShowEventsPage implements OnInit {

  items: any = [];
  attends_array: any = [];

  constructor(private auth: AuthService, private apiService: ApiService, private modalController: ModalController) {
    this.getAttends();

    this.apiService.getEvents()
    .then(data => {
      this.items = data;
      console.log('my news: ', data);
    })
  }

  ngOnInit() { }

  /*
  ** Gets all the attends(people who answered to events).
  */
  getAttends(): void {
    this.apiService.getAttends()
    .then(data => {
      this.attends_array = data;
      console.log("Attends: ", data);
    })
  }

  /*
  ** Converts a given date and time to a more suitable format.
  */
  convertDate(date: string, time: string): string {
    let array = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    let oldDate = new Date(date);
    let weekDay = oldDate.getDay();
    return days[weekDay] + ", " + oldDate.getDate() + " de " + array[oldDate.getMonth()] + " às " + time.substring(0,5);
  }

  /*
  ** Sets the ion-select with the option stored on the database (if any).
  */
  setComponent(id: number): string {
    let result = "";
    
    for(let item of this.attends_array) {
      if(item['event_id'] == id) {
        if(item['user_id'] == this.auth.getUserID()) {
          result = item['will_go'];
        }
      }
    }
    return result;
  }

  /*
  ** Whenever the ion-select changes, PUT the changed value on the database.
  */
  segmentChanged(id: number, ev: any): void {
    this.putAttend(id, ev.detail['value']);
  }

  /*
  ** Makes an API call to PUT the attend on the database.
  */
  putAttend(id, detail): void {
    let attend_id: number = 0;
    for(let item of this.attends_array) {
      if(item['user_id'] == this.auth.getUserID()) {
        if(item['event_id'] == id) {
          attend_id = item['id'];
        }
      }
    }
    this.apiService.putAttend(attend_id, this.auth.getUserID(), id, detail)
    .then(data => {
      console.log(data);
    })
  }

  /*
  ** Opens the Attend Modal Page.
  */
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: AttendModalPage,
      componentProps: { 'value': id }
    });
    await modal.present();
  }
}
