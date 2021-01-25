import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';

import { Router } from '@angular/router';
import { database } from 'firebase';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})


export class FcmService {
  TOKEN:any;

  constructor(private router:Router) { }

  public initPush(){
    if(Capacitor.platform !== 'ios'){
      this.registerPush();
    }
  }

  private registerPush(){
    PushNotifications.requestPermission().then((permission) =>{
      if(permission.granted){
        PushNotifications.register();
      } else {
        // No Permission
      }
      
    });

  PushNotifications.addListener(
    'registration',
    (token:PushNotificationToken) => {
      console.log('My token:'+JSON.stringify(token));
      this.TOKEN = JSON.stringify(token);
    }

  );


  PushNotifications.addListener('registrationError' , (error:any)=>{
    console.log('Error:' +JSON.stringify(error));
  });

 PushNotifications.addListener(
   'pushNotificationReceived',
   async (notification:PushNotification)=>{
     console.log('Push received:'+JSON.stringify(notification.notification));
     
   }
 );

 PushNotifications.addListener(
   'pushNotificationActionPerformed',
   async (notification:PushNotificationActionPerformed)=>{
     const data =notification.notification.data;
     console.log('Action performed:'+JSON.stringify(notification.notification));
     if(data){
       this.router.navigateByUrl(`/messages`);
     }
   }
 );

  }
}
