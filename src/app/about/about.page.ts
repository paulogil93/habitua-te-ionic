import { Component, OnInit } from '@angular/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private callNumber: CallNumber, private launchNavigator: LaunchNavigator, private iab: InAppBrowser) { }
  
  ngOnInit() { }

  /*
  ** Opens dialog to choose a navigation app.
  */
  openGMaps(): void {
    this.launchNavigator.navigate([40.677357, -7.695986])
    .then(
      success => console.log('Launched navigator', success),
      error => console.log('Error launching navigator', error)
    );
  }

  /*
  ** Opens my Github page :)
  */
  openGithub(): void {
    const browser = this.iab.create("https://github.com/paulogil93/", "_system");
    browser.close();
  }

  /*
  ** Opens my LinkedIn profile :)
  */
  openLinkedin(): void {
    const browser = this.iab.create("https://www.linkedin.com/in/paulogil93/", "_system");
    browser.close();
  }

  /*
  ** Opens the dialer with the owner's number
  */
  openDialer(): void {
    this.callNumber.callNumber("123456789", true)
    .then(res => console.log("Launched dialer!", res))
    .catch(err => console.log("Error lauching dialer", err));
  }
}
