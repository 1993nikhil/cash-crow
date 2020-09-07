import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular'; 
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;

   islogin = true;

  constructor(private authService:AuthService,
              private router:Router,
              private loadingctrl:LoadingController ) { }

  ngOnInit() {
  }
  onLogin(){
    this.isLoading=true;
    this.authService.login();
    this.loadingctrl.create({keyboardClose:true,message:"Hold On ! Getting you in ..."})
    .then(loadingEl =>{loadingEl.present();
    setTimeout(() =>{
      this.isLoading = false;
      loadingEl.dismiss();
      this.router.navigateByUrl('/messages');
    },1500);
    
  });
  }

  onSubmit(form: NgForm){
    console.log("I am in Submit Function");
    console.log(form);
    if (!form.valid){
      return;
    }

    const email = form.value.AuthEmail;
    const password = form.value.AuthPassword;
    console.log(email,password);

    if (this.islogin){
      //Send a req to login server
    }
    else {
      //send req to sigun up server
    //   this.authService.signup(email , password).subscribe(resData => {
    //     console.log(resData);
    //   });
    // }
      }
    // onSwitchAuthMode(){
    //   this.islogin = !this.islogin;

    //         }

  
  }}
