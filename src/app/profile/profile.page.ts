import { Component, OnInit } from '@angular/core';
import { User } from "../Modal/user.model";
import { AuthService } from '../auth/auth.service';
//import { AuthPage } from '../auth/auth.page';
import { HttpAppGateway } from '../app-gateway/http-app-gateway';
import { AuthPage } from '../auth/auth.page';
import { UserDetailServices } from '../services/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: string;
  email: string;
  constructor(private authservice: AuthService,
             // private authpage:AuthPage,
              private GateWay: HttpAppGateway,
              private userDetailsService: UserDetailServices
              ) {
                  this.userId = userDetailsService.userDetails.userId;
                  this.email = userDetailsService.userDetails.email;
                  console.log("User iD ",this.userId," email ",this.email);
               }

  ngOnInit() {
  }

  view(){
    
   console.log(AuthPage);
    
  }

}
