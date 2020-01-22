import { Injectable } from '@angular/core';
import * as jsSHA from 'jssha';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLoggedIn: boolean = false;
  private userDetails: any = {};
  private salt: string = "INSERT SALT HASH HERE";

  constructor() { }

  /*
  ** Returns a SHA-256 hash of the user email address plus the salt.
  */
  getApiKey(): string {
    let input = this.getEmail() + this.salt;
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(input);
    return shaObj.getHash("HEX");
  }

  /*
  ** Returns a SHA-256 hash of the string 'post' plus the salt:
  ** This key is only used to post user details since the API requires an API key to access all endpoints.
  */
  getPostKey(): string {
    let input = "post" + this.salt;
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(input);
    return shaObj.getHash("HEX");
  }

  /*
  ** Useful functions to make the app work.
  */

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  setUserID(value: number): void {
    this.userDetails.user_id = value;
  }

  setUserDetails(value: Object): void {
    this.userDetails = value;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUserID(): number {
    return this.userDetails.user_id;
  }

  getUserDetails(): Object {
    return this.userDetails;
  }

  getName(): string {
    return this.userDetails.name;
  }

  getEmail(): string {
    return this.userDetails.email;
  }

  getPicture(): string {
    return this.userDetails.profile_pic;
  }
}
