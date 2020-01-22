import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalPagePage } from './modal-page/modal-page.page';
import { SearchModalPage } from './search-modal/search-modal.page';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './auth.service';
import { LikeModalPage } from './like-modal/like-modal.page';
import { AttendModalPage } from './attend-modal/attend-modal.page';
import { ApiService } from './api.service';
import { ProfileModalPage } from './profile-modal/profile-modal.page';
import { TermsModalPage } from './terms-modal/terms-modal.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  declarations: [
    AppComponent,
    ModalPagePage,
    SearchModalPage,
    LikeModalPage,
    AttendModalPage,
    ProfileModalPage,
    TermsModalPage
  ],
  entryComponents: [
    ModalPagePage,
    SearchModalPage,
    LikeModalPage,
    AttendModalPage,
    ProfileModalPage,
    TermsModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    NativeStorage,
    AuthService,
    ApiService,
    LaunchNavigator,
    InAppBrowser,
    OneSignal,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
