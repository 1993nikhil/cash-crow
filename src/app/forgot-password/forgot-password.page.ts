import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PassService } from './pass.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private passService:PassService,private router:Router,
    private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  async resetPassword(form:NgForm):Promise<void>{
    if (!form.valid) {
      return;
    }else{
    this.passService.resetPassword(form.value.resetemail).then(
      async ()=>{
        const alert = await this.alertCtrl.create({
          message:'Reset Email has been sent to your Email , Please Check !',
          buttons:[{text:'Ok',role:'cancel',handler:()=>{
            this.router.navigateByUrl('/auth');
          }}],
        });
        await alert.present();
      },
      async error=>{
        const errorAlert = await this.alertCtrl.create({
        message:error.message,
        buttons:[{text:'Ok',role:'cancel'}],
        });
        await errorAlert.present();
      }
    );

  }

}
}
