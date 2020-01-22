import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { reject } from 'q';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: "API_BASE_URL";

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  /**Login page requests**/

  postUser(userName: string, userEmail: string, userPic: string) {
    return new Promise(resolve => {
        let data = {}
        this.httpClient.post(this.API_URL + "/users/", JSON.stringify(data), {
          headers: new HttpHeaders().set("Accept", 'application/json').set("X-Api-Key", this.auth.getPostKey()),
          params: new HttpParams({ fromObject : {
            name: userName,
            email: userEmail,
            profile_pic: userPic
          }}),
        }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      })
  }

  /**Home page requests**/

  getNews() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/events/news/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      }).subscribe(data => {
        resolve(data);
      }, err =>  {
        console.log(err);
      });
    })
  }

  getLikes() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/likes/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      }).subscribe(data => {
        resolve(data);
      }, err =>  {
        console.log(err);
      });
    })
  }

  getLikesByEvent(event_id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/likes/event/" + event_id + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err)
      });
    });
  }

  postLike(user_id: any, event_id: any) {
    return new Promise(resolve => {
      let data = {}
      this.httpClient.post(this.API_URL + "/likes/", JSON.stringify(data), {
        headers: new HttpHeaders().set("Accept", 'application/json')
        .set('Content-Type','application/json')
        .set("X-Api-Key", this.auth.getApiKey()),
        params: new HttpParams({ fromObject : {
          user_id: user_id,
          event_id: event_id
        }}),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    })
  }

  deleteLike(id: number) {
    return new Promise(resolve => {
      this.httpClient.delete(this.API_URL + "/likes/" + id + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey()),
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Products page requests**/

  getCategories() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/categories/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getFavouriteProducts() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/favourites/top5/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Filtered products page requests**/

  getProducts(id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/products/category/" + id, {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Product details modal page requests**/

  getProductDetails(id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/products/" + id + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Search modal page requests**/

  getAllProducts() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/products/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Events requests**/

  getEvents() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/events/event/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAttends() {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/attends/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  putAttend(attend_id: number, user_id: number, event_id: number, will_go: string) {
    return new Promise(resolve => {
      let data = {}
      this.httpClient.put(this.API_URL + "/attends/" + attend_id + "/", JSON.stringify(data), {
        headers: new HttpHeaders().set("Accept", 'application/json')
        .set('Content-Type', 'application/json')
        .set("Access-Control-Allow-Origin", "*")
        .set("X-Api-Key", this.auth.getApiKey()),
        params: new HttpParams({ fromObject : {
          user_id: user_id.toString(),
          event_id: event_id.toString(),
          will_go: will_go
        }}),
      }).subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Attend modal page requests**/

  getAttendsByID(attend_id: number, category: string) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/attends/event/" + attend_id + "/" + category + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAllAttends(attend_id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/attends/event/" + attend_id + "/all/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**Profile requests**/

  getFavouritesByUserID(user_id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/favourites/user/" + user_id + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  putFavourite(favourite_id: number, user_id: number, product_id: number) {
    return new Promise(resolve => {
      let data = {}
      this.httpClient.put(this.API_URL + "/favourites/" + favourite_id + "/", JSON.stringify(data), {
        headers: new HttpHeaders().set("Accept", 'application/json').set("X-Api-Key", this.auth.getApiKey()),
        params: new HttpParams({ fromObject : {
          user_id: user_id.toString(),
          product_id: product_id.toString()
        }}),
      }).subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getUserByID(user_id: number) {
    return new Promise(resolve => {
      this.httpClient.get(this.API_URL + "/users/" + user_id + "/", {
        headers: new HttpHeaders().set("X-Api-Key", this.auth.getApiKey())
      })
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

}