import { HttpClient } from "@angular/common/http";

import { Component, ViewChild, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { LoadingController } from "@ionic/angular";
import * as firebase from "firebase";
import { Plugins,LocalNotificationEnabledResult,LocalNotificationActionPerformed,LocalNotification,Device } from "@capacitor/core";

import { interval, Subscription } from "rxjs";
// const functions = require('firebase-functions');

// import {  } from 'rxjs';
import { MessagePageServices } from "./message.page.service";
const { LocalNotifications } = Plugins;

export interface Data {
  movies: string;
}
@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  // TOKEN1:any;
  public counterforpushnotification:any;
  public olddata:Data;
  public data: Data;
  public data1:Data;
  public columns: any;
  public rows: any;
  public x: any;
  url = "https://cashcrow-c3ce7.firebaseio.com/Mastersheet/";
  sub: Subscription;
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private Msgpgsrvc: MessagePageServices,
    public loadingctrl: LoadingController,
    // private localNotifications:LocalNotifications
  ) 
    {
      // var database = firebase.database();

      // var ref = database.ref("Mastersheet/Telegram Calls/Calls");
      // ref.once("value", (gotData) => {
      //   this.data = gotData.val();
      //     console.log("once",this.data);
      //     return this.data;
          
          
      // });
      
      // const counter = interval(5000);
      // this.sub = counter.subscribe((val) => {
      //   console.log("called");  
       
      //   var database = firebase.database();
      //   var ref1 = database.ref("Mastersheet/Telegram Calls/Calls");
      //   ref1.once("value",function(snapshot){
      //     console.log(snapshot.val());
      //     // console.log(this.data);

      //   })
      // });
      
      }

    

  

  async ngOnInit() {
    await LocalNotifications.requestPermission();
    var database = firebase.database();

      var ref = database.ref("Mastersheet/Telegram Calls/Calls");
      ref.once("value", (gotData) => {
        this.data = gotData.val();
          
          // return this.data;
          this.datafromFirebase();
            
      });
      
      const counter = interval(3000);
      this.sub = counter.subscribe((val) => {
        
        console.log("once wala data",this.data); 

        if(this.data==this.data1){
      
        }else{
    
          this.data=this.data1;
          setTimeout(()=>{
          //   LocalNotifications.schedule({
          //    notifications:[{
          //      title:'New Call Received',
          //      body:`${this.data1}`,
          //      id:1,
          //      smallIcon:"ic_launcher.png"
               
          //    }
          //    ]
          //  });
         this.PushNotificationforcall();
         }

          ,3000); 
        }
    
      });

     
    
    

    
  }

  Refresh() {
    this.loadingctrl
      .create({ keyboardClose: true, message: "Refreshing.." })
      .then((loadingR1) => {
        loadingR1.present();
        this.x = this.datafromFirebase();
        setTimeout(() => {
          loadingR1.dismiss();
        }, 2000);
      });
  }

  datafromFirebase() {
        var database = firebase.database();
    var ref = database.ref("Mastersheet/Telegram Calls/Calls");
    ref.on("value", (gotData) => {
      this.data1 = gotData.val();
      
      
    });
    
    const counter = interval(10000);
      this.sub = counter.subscribe((val) => {
        console.log("called"); 
        console.log("10 sec wala data",this.data1); 
        
        // console.log(this.data);
        // console.log("This one is below old data")
        // var database = firebase.database();
        // var ref1 = database.ref("Mastersheet/Telegram Calls/Calls");
        // ref1.once("value",function(snapshot){
        //   console.log(snapshot.val());
          // console.log(this.data);

        // })
      });
      return this.data1;
  }


   PushNotificationforcall(){
     LocalNotifications.schedule({
      notifications:[{
        title:'New Call Received',
        body:`${this.data}`,
        id:1,
        smallIcon:"ic_launcher.png"
        
      }
      ]
    });
  }

    
}
