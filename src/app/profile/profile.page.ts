import { Component, OnInit } from "@angular/core";
import { User } from "../Modal/user.model";
import { AuthService } from "../auth/auth.service";
//import { AuthPage } from '../auth/auth.page';
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
import { switchMap } from "rxjs/operators";
import * as firebase from "firebase";

import { getLocaleDateFormat } from "@angular/common";
import { FirebaseApp } from "@angular/fire";
import { Injectable } from "@angular/core";
import { Keys } from "@swimlane/ngx-datatable";

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
  DBdata:any;
  k:any;
  UIDfromFirebase:any;
  u:any;
  t:any;

  constructor(
    private authservice: AuthService,
    private afAuth: AngularFireAuth,
    private GateWay: HttpAppGateway,
    private userDetailsService: UserDetailServices,
    private db: AngularFireDatabase
             ) {
                    this.userId = userDetailsService.userDetails.userId;
                    this.email = userDetailsService.userDetails.email;
                    this.counter = authservice.counterforprofile;
                    const user = this.db.list("/users") as AngularFireList<User>;
              };

  ngOnInit() {
    
             };

  view()     {
                    this.delete();
             };

  delete()   {
                    var database = firebase.database();
                    var refx = database.ref("users/");
                    refx.on("value", (gotdata) => {
                                                      this.DBdata = gotdata.val();
                                                      var key = Object.keys(this.DBdata);
                                                      console.log(key);
                                                            for (var i = 0; i < key.length; i++)
                                                             {
                                                                this.k = key[i];
                                                                this.UIDfromFirebase = this.DBdata[this.k].uid;
                                                                console.log(this.userId);
                                                                console.log(this.UIDfromFirebase);
                                                                if (this.userId == this.UIDfromFirebase) {
                                                                    var z = key[i];
                                                                    var removeolddetails = firebase.database().ref(`users/${z}`);
                                                                    removeolddetails.remove().then(function () {
                                                                          console.log("Data Removed");
                                                                                                  }).then(function(){
                                                                                                    this.update();
                                                                                                  });
                                                                } 


                                                             }
     
                                                  }
                             );

             };

    
    
  

   update() {
                     const x = this.username;
                     console.log("username - ", this.username);
                     console.log("Mobile - ", this.mobile);
                     this.db.list(`users/`).push({
                     uid: this.userId,
                     email: this.email,
                     name: this.username,
                     mobile: this.mobile,
                                                 });
                               
                     var database = firebase.database();
                     var refx=database.ref("users/");
                     refx.on("value",(fetchdata)=>{
                                                    var DB = fetchdata.val();
                                                    var key = Object.keys(DB);
                                                      for (var i =0;i<key.length;i++){
                                                              this.t =key[i];
                                                             this.u = this.DBdata[this.t].uid;
                                                             console.log(this.userId,this.u);
                                                                if(this.userId == this.u){
                                                                      var NameFromFirebase = this.DBdata[this.t].name;
                                                                      var Mob = this.DBdata[this.t].mobile;
                                                                      console.log(NameFromFirebase, Mob);
                                                                                    }
                                                                                      }
                                                   });
    
  

 
            };


}

