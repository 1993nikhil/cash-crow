import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController, NavController } from "@ionic/angular";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AppGateway } from "../app-gateway/app-gateway";
import { Observable } from 'rxjs';
import { AuthResponseData } from '../Modal/auth-response-data';
import { User } from '../Modal/user.model';
import { UserDetailServices } from '../services/user-details.service'
//import { profilePage } from 'src/app/profile/profile.page' ;

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoading = false;
  islogin = true;
  UID :string;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingctrl: LoadingController,
    private appGateway: AppGateway,
    private alertCtrl: AlertController,
    public navctrl : NavController,
    public userDetails: UserDetailServices
  ) {}

  ngOnInit() {}
  authenticate(email: string, password: string) {
    this.isLoading = true;
    let counter=0;
    this.loadingctrl
      .create({ keyboardClose: true, message: "Hold On ...." })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>
        
        if(this.islogin){
          counter++;
          authObs = this.authService.login(email , password);
          
        }
        else{
          authObs =this.appGateway.Signup(email, password);
         // this.navctrl.push(profilePage,authObs);   
        }
        authObs.subscribe(
          (response) => {
            this.userDetails.userDetails = {
              userId: response.localId,
              email: response.email
            }
            //this.UID = response.localId;
            console.log("UID",this.userDetails);
            console.log("Response", response);
            this.isLoading = false;
            loadingEl.dismiss();
            if (counter==1){
              this.router.navigateByUrl("/messages");
            }else{
              
              let message = "Hurray !! Sign Up Complete , Please set up your profile now .. ";
              this.showAlertforSignUp(message);
              this.router.navigateByUrl("/profile");      
              
              

            }
            
          },
          (errRes) => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = "Not able to sign you up, please try again.";
            if (code === "EMAIL_EXISTS") {
              message = "This email exists already ! Please use another email.";
            }else if (code === "EMAIL_NOT_FOUND"){
              message = "Email could not be found ."
            }else  if (code === "INVALID_PASSWORD"){
              message = " Oops..Password is not correct ! "
            }
            this.showAlertforSignIn(message);
          }
        );
      });
  }

  view1(){
    {
      return this.UID;
    }
  }

  onSwitchAuthMode() {
    this.islogin = !this.islogin;
  }

  onSubmit(form: NgForm) {
    // console.log("I am in Submit Function");
    // console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.AuthEmail;
    const password = form.value.AuthPassword;
    // console.log(email, password);
    this.authenticate(email, password);
  }

  private showAlertforSignIn(message: string) {
    
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message: message,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
  private showAlertforSignUp(message: string) {
   // let Okay=this.router.navigateByUrl("/auth");
    this.alertCtrl
      .create({
        header: "Registration Successfull ",
        message: message,
        buttons: [
          {
           text: "Okay",
          }          
          ]
      })
      .then((alertEl) => alertEl.present());
      
  }
} 
    
  
  

