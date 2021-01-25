import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { firebaseConfig } from 'src/environments/environment.prod';
// import { FcmService } from './services/fcm.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
 })
 export class AppComponent {
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    // private fcmservice:FcmService,
    private router :Router
   )  {
    this.initializeApp();
   }

   initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.fcmservice.initPush();
      firebase.initializeApp(firebaseConfig);

    });
  }

  onLogout() {
  console.log('Inside Logout func');
  this.authService.logout();
  this.router.navigateByUrl('/auth');
  }
}
