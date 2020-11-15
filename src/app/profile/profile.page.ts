import { Component, NgZone, OnInit } from "@angular/core";
import { User } from "../Modal/user.model";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { HttpAppGateway } from "../app-gateway/http-app-gateway";
import { AuthPage } from "../auth/auth.page";
import { UserDetailServices } from "../services/user-details.service";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { auth } from "firebase/app";
import { Subject } from "rxjs";

import * as firebase from "firebase";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  counter: any;
  userId: string;
  email: string;
  username: string;
  mobile: string;
  user$ = new Subject<any>();
  data: any;
  changednamefromfirebase: any;
  changedmobfromfirebase: string;
  n: any;
  DBdata: any;
  k: any;
  UIDfromFirebase: any;
  u: any;
  t: any;
  DB: any;
  gettingdataforreading: any;
  p: any;
  profname: any;
  profmob: any;
  datacounter = 0;

  constructor(
    private authservice: AuthService,
    private afAuth: AngularFireAuth,
    private GateWay: HttpAppGateway,
    private userDetailsService: UserDetailServices,
    public loadingctrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private db: AngularFireDatabase
  ) {
    this.userId = userDetailsService.userDetails.userId;
    this.email = userDetailsService.userDetails.email;
    this.counter = authservice.counterforprofile;
    const user = this.db.list("/users") as AngularFireList<User>;
  }

  ngOnInit() {
    if (this.counter == 1) {
      {
        this.loadingctrl
          .create({ keyboardClose: true, message: "Refreshing Profile Data.." })
          .then((loadingR1) => {
            loadingR1.present();
            this.ReadData();
            setTimeout(() => {
              loadingR1.dismiss();
            }, 2000);
          });
      }
    }
  }

  check() {
    {
      this.view();
    }
  }

  view() {
    var database1 = firebase.database();
    var refxx = database1.ref("users/");
    refxx.on("value", (gotdata1) => {
      var db2 = gotdata1.val();
      console.log(db2);
      if (db2 !== null) {
        var keyss = Object.keys(db2);
        console.log(keyss);
        {
          if (keyss.length > 0) {
            this.delete();
          }
        }
      } else {
        refxx.off("value");
        console.log("Inside updating data");
        this.update();
      }
    });
  }

  delete() {
    var database = firebase.database();
    var refx = database.ref("users/");
    refx.on("value", (gotdata) => {
      this.DBdata = gotdata.val();
      console.log("val ran");
      var key = Object.keys(this.DBdata);
      console.log(key);
      for (var i = 0; i < key.length; i++) {
        this.k = key[i];
        this.UIDfromFirebase = this.DBdata[this.k].uid;
        console.log(this.userId);
        console.log(this.UIDfromFirebase);
        if (this.userId == this.UIDfromFirebase) {
          var counter = 1;
          var m = i;
        } else {
          refx.off("value");
          this.update();
        }
      }
      {
        if (counter == 1) {
          var z = key[m];
          console.log(z);
          var removeolddetails = firebase.database().ref(`users/${z}`);
          removeolddetails
            .remove()
            .then(function () {
              console.log("Data Removed");
            })
            .then(function () {
              refx.off("value");
              this.update();
            });
        }
      }
    });

    refx.off("value");
  }

  showAlertforupdateprofile(message: string) {
    // let Okay=this.router.navigateByUrl("/auth");
    this.alertCtrl
      .create({
        header: "Updation Success ",
        message: message,
        buttons: [
          {
            text: "Login",
          },
        ],
      })
      .then((alertEl) => alertEl.present());

    //  run(() => this.router.navigateByUrl("/auth"));
  }

  update() {
    console.log("username - ", this.username);
    console.log("Mobile - ", this.mobile);
    this.db.list("users/").push({
      uid: this.userId,
      email: this.email,
      name: this.username,
      mobile: this.mobile,
    });

    if ((this.counter = 1)) {
      let message = "Profile Updated , Login now .. ";
      this.showAlertforupdateprofile(message);
      this.router.navigateByUrl("/auth");
    }
    //  var database = firebase.database();
    //  var refx=database.ref('users/');
    //  refx.on('value',((fetchdata)=>{
    //                                 this.DB = fetchdata.val();
    //                                 var key = Object.keys(this.DB);

    //                                   for (var i =0;i<key.length;i++){
    //                                           this.t =key[i];

    //                                          this.u = this.DB[this.t].uid;
    //                                          console.log(this.u);
    //                                          console.log(this.userId,this.u);
    //                                             if(this.userId == this.u){
    //                                                   var NameFromFirebase = this.DB[this.t].name;
    //                                                   var Mob = this.DB[this.t].mobile;
    //                                                   console.log(NameFromFirebase, Mob);
    //                                                                 }
    //                                                                   }
    //                                }));

    //                                refx.off('value');
  }

  ReadData() {
    var database = firebase.database();
    var refer = database.ref("users/");
    refer.on("value", (gettingdata) => {
      this.gettingdataforreading = gettingdata.val();
      var key = Object.keys(this.gettingdataforreading);
      for (var i = 0; i < key.length; i++) {
        this.n = key[i];
        this.p = this.gettingdataforreading[this.n].uid;
        if (this.userId == this.p) {
          this.profname = this.gettingdataforreading[this.n].name;
          this.profmob = this.gettingdataforreading[this.n].mobile;
          console.log(this.profname, this.profmob);
          return this.profmob, this.profname;
        }
      }
    });
  }

  Refresh() {
    {
      this.loadingctrl
        .create({ keyboardClose: true, message: "Refreshing Profile Data.." })
        .then((loadingR1) => {
          loadingR1.present();
          this.ReadData();
          setTimeout(() => {
            loadingR1.dismiss();
          }, 2000);
        });
    }
  }
}
