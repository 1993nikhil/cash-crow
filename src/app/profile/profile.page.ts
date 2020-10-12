import { Component, OnInit } from '@angular/core';
import { User } from "../Modal/user.model";
import { AuthService } from '../auth/auth.service';
//import { AuthPage } from '../auth/auth.page';
import { HttpAppGateway } from '../app-gateway/http-app-gateway';
import { AuthPage } from '../auth/auth.page';
import { UserDetailServices } from '../services/user-details.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { auth } from 'firebase/app';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: string;
  email: string;
  username: string;
  mobile: string;
  user$ = new Subject<any>();
  constructor(private authservice: AuthService,
              private afAuth:AngularFireAuth,
              private GateWay: HttpAppGateway,
              private userDetailsService: UserDetailServices,
              private db: AngularFireDatabase
              ) {
                  this.userId = userDetailsService.userDetails.userId;
                  this.email = userDetailsService.userDetails.email;
                  //const key = 'MJT1UuIsYeW61DjBcOI';
                  const user = this.db.list('/users') as AngularFireList<User>;
                  user.snapshotChanges().subscribe(res=> {
                      console.log("res - ",res);
                      res.forEach(r => {
                        console.log("payload", r.payload.val());
                        console.log("key",r.key);
                      })
                  });
                  // uquery.subscribe(queriedItem => {
                  //   console.log("queried item ",queriedItem);
                  // });
               }

  ngOnInit() {
  }

  view(){
    
   //console.log(AuthPage);
    
  }

  update() {
    console.log("username - ",this.username);
    this.db.list('users').push({
      uid: this.userId,
      email: this.email,
      name: this.username,
      mobile: this.mobile
    }); 
       
  }


}
