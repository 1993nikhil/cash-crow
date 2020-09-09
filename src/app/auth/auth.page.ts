import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AppGateway } from "../app-gateway/app-gateway";
import { Observable } from 'rxjs';
import { AuthResponseData } from '../Modal/auth-response-data';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoading = false;
  islogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingctrl: LoadingController,
    private appGateway: AppGateway,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}
  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingctrl
      .create({ keyboardClose: true, message: "Hold On ! Getting you in ..." })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>
        if(this.islogin){
          authObs = this.authService.login(email , password);
        }
        else{
          authObs =this.appGateway.getLoginDetails(email, password);
        }
        authObs.subscribe(
          (response) => {
            console.log("Response", response);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl("/messages");
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
            this.showAlert(message);
          }
        );
      });
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

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message: message,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
} 
    
  
  

