import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LikeModalPage } from '../like-modal/like-modal.page';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  items: any;
  likes_array: any = [];
  user_id: number = 0;

  constructor(private modalController: ModalController, private auth: AuthService, private apiService: ApiService) {
    this.user_id = this.auth.getUserID();
    this.getNews();
    this.getLikes();
  }

  ngOnInit() { }

  /*
  ** Gets the news feed from the API
  */
  getNews(): void {
    this.apiService.getNews()
    .then(data => {
      this.items = data;
      console.log("News: ", data);
    })
  }

  /*
  ** Gets the likes of each item of the feed from the API
  */
  getLikes(): void {
    this.apiService.getLikes()
    .then(data => {
      this.likes_array = data;
      console.log("Likes: ", data);
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
  ** Like procedure:
  ** -> Changes the color of the Like button.
  ** -> Checks if the current item of the news feed already has a like from the user.
  ** -> Sets the Like status according to the last condition.
  */
  like(event_id): void {
    let like: number;
    this.changeColors(event_id);
    
    like = this.check(this.user_id, event_id);

    if(like == 0) {
      this.makeLike(this.user_id, event_id);
    } else {
      this.makeDislike(like);
    }
  }

  /*
  ** Checks if the current user has liked the item on the news feed.
  ** Returns 1 or 0 (True or False)
  */
  check(user_id, news_id): number {
    let result: number = 0;

    if(this.likes_array.length != 0) {
      for(let like of this.likes_array) {
        if(like['event_id'] == news_id) {
          if(like['user_id'] == user_id) {
            result = like['id'];
          }
        }
      }
    }
    return result;
  }

  /*
  ** Calls the API Service to POST a like.
  */
  makeLike(user_id, news_id): void {
    this.apiService.postLike(user_id, news_id)
    .then(data => {
      let like = {
        id: data['id'],
        user_id: data['user_id'],
        event_id: data['event_id']
      }
      this.likes_array.push(like);
      console.log("POST: ", data);
    })
  }

  /*
  ** Calls the API Service to DELETE a like.
  */
  makeDislike(like_id): void {
    this.apiService.deleteLike(like_id)
    .then(data => {
      console.log(data);
      for(let index = 0; index < this.likes_array.length; index++) {
        let like = this.likes_array[index];
        if(like['id'] == data['id']) {
          this.likes_array.splice(index, 1);
        }
      }
    })
  }

  /*
  ** Changes the color scheme of the Like button by changing the className.
  */
  changeColors(id: string): void {
    let component = document.getElementById(id);
    if(component.className == "ion-color ion-color-light md ion-activatable hydrated activated") {
      component.className = "ion-color ion-color-secondary md ion-activatable hydrated activated";
    } else {
      component.className = "ion-color ion-color-light md ion-activatable hydrated activated";
    }
  }

  /*
  ** Sets the layout according to the information on the database:
  ** If the current user already liked a certain news, sets the Like button accordingly.
  */
  setComponent(news_id: string): void {
    let like = this.check(this.user_id, news_id);
    let component = document.getElementById(news_id);
    if(like == 0) {
      component.className = "ion-color ion-color-light md ion-activatable hydrated activated";
    } else {
      component.className = "ion-color ion-color-secondary md ion-activatable hydrated activated";
    }
  }

  /*
  ** Gets the like count of a given news item.
  */
  getLikeCount(id: number): number {
    let count: number = 0;
    for(let item of this.likes_array) {
      if(item['event_id'] == id) {
        count++;
      }
    }
    return count;
  }

  /*
  ** Opens the Like Modal Page.
  */
  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: LikeModalPage,
      componentProps: { 'value': id }
    });
    await modal.present();
  }
}