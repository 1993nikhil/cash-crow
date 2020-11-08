import { HttpClient } from "@angular/common/http";

import { Component, ViewChild, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { LoadingController } from "@ionic/angular";
import * as firebase from "firebase";

import { interval, Subscription } from "rxjs";

// import {  } from 'rxjs';
import { MessagePageServices } from "./message.page.service";

export interface Data {
  movies: string;
}
@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public x: any;
  url = "https://cashcrow-c3ce7.firebaseio.com/Mastersheet/";
  sub: Subscription;
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private Msgpgsrvc: MessagePageServices,
    public loadingctrl: LoadingController
  ) {
    {
      var database = firebase.database();

      var ref = database.ref("Mastersheet/Telegram Calls/Calls");
      ref.on("value", (gotData) => {
        this.data = gotData.val();
        console.log(this.data);
        return this.data;
      });
      const counter = interval(5000);
      this.sub = counter.subscribe((val) => {
        console.log("called");
      });
    }
  }

  ngOnInit() {
    this.x = this.datafromFirebase();
    // this.Msgpgsrvc.gotdata().subscribe((res)=>{
    //   this.x = res
    //   console.log(this.x)
    // });
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
    // this.Msgpgsrvc.gotdata().subscribe(

    //   (res)=>{
    //     const convdata = res
    //     console.log(convdata)});

    var database = firebase.database();
    var ref = database.ref("Mastersheet/Telegram Calls/Calls");
    ref.on("value", (gotData) => {
      this.data = gotData.val();
      console.log(this.data);
      return this.data;
    });
  }
}
