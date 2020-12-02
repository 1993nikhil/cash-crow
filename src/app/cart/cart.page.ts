import { Component, OnInit } from "@angular/core";
import { WebIntent } from "@ionic-native/web-intent/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  constructor(private webIntent: WebIntent,
              private router   : Router) {}

  ngOnInit() {}

  weekly() {

      const tid = this.getRandomString();
    const orderId = this.getRandomString();
    const totalPrice = 10.00;
    const UPI_ID = '07ashutosh.kumar@scb';
    const UPI_NAME = 'Ashutosh Kumar';
    const UPI_TXN_NOTE = 'CashCrow-Weekly Package';
    // tslint:disable-next-line: max-line-length
    //const uri="www.facebook.com"
    const uri = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${totalPrice}&tn=${UPI_TXN_NOTE}`;
    
    // console.log("Inside UPI Function");
    // const options = {
    //   action: this.webIntent.ACTION_VIEW,
    //   url: uri.replace(" ","+")
    //   // requestCode:1
    // };
    (window as any).plugins.intentShim.startActivityForResult(
      {
        action: this.webIntent.ACTION_VIEW,
        url: uri,
        requestCode: 1
      }, intent => {
        if (intent.extras.requestCode === 1 &&
            intent.extras.resultCode === (window as any).plugins.intentShim.RESULT_OK &&
            intent.extras.Status &&
            (((intent.extras.Status as string).toLowerCase()) === ('success'))) 
            {
              this.paymentSuccess('weekly','500','UPI');
            }
    

      // this.webIntent.startActivityForResult(options).then(success=>{
      //   if(success.extras.Status === 'SUCCESS'){
          

      //         console.log("Inside if block , checked condition")

      //           const pckgName ='Weekly'
      //   const method   ='UPI'
      //   const cost      = '500'
      //   this.router.navigateByUrl("/auth");
      //   this.paymentSuccess(pckgName,cost,method);
            
          // } 
          else {
            alert('payment failed at App');
          }
        } ,
        err => {
          alert('error block' + err);
        }
        // const pckgName ='Weekly'
        // const method   ='UPI'
        // const cost      = '500'
        // console.log("Success", onSucces);
        // this.paymentSuccess(pckgName,cost,method);
     
      
      );
  
    }
  monthly() {
    console.log("Inside UPI Function");
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url:"www.facebook.com"
      // url: "upi://pay?pa=07ashutosh.kumar@scb&pn=CashCrow+Package&tid=CashCrow-Monthly&am=10&cu=INR&tn=AppPayment",
    };
    this.webIntent.startActivityForResult(options).then(
      (onSucces) => {
        const pckgName ='Monthly'
        const method   ='UPI'
        const cost      = '3000'
        console.log("Success", onSucces);
        this.paymentSuccess(pckgName,cost,method);
        
      },
      (err) => {
        console.log("Error" + err);
      }
    );
  }

  quarterly() {
    console.log("Inside UPI Function");
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: `upi://pay?pa=07ashutosh.kumar@scb&pn=Ashutosh+Kumar&tid=CashCrow-Quarterly&am=8500&cu=INR&tn=AppPayment`,
    };
    this.webIntent.startActivityForResult(options).then(
      (onSucces) => {
        const pckgName ='Quarterly'
        const method   ='UPI'
        const cost      = '8500'
        console.log("Success", onSucces);
        this.paymentSuccess(pckgName,cost,method);
      },
      (err) => {
        console.log("Error" + err);
      }
    );
  }
  paymentSuccess(packgname: any,Amount:any, paymentMethod: string) {
    alert(`Thank you !! \n \n Your Payment was successful. \n Package Name :- ${packgname} ,\n Amount :- ${Amount} ,\n Payment method :- ${paymentMethod}\n\n Login Now...`);
    
  }
getRandomString() {
    const len = 10;
    const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }


}
  //   const tid = this.getRandomString();
  //   const orderId = this.getRandomString();
  //   const totalPrice = 1.00;
  //   const UPI_ID = '919470516408@scb';
  //   const UPI_NAME = 'Ashutosh Kumar';
  //   const UPI_TXN_NOTE = 'CashCrow-Pckg TXN';
  //   // tslint:disable-next-line: max-line-length
  //   let uri = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&tid=${tid}&am=${totalPrice}&cu=INR&tn=${UPI_TXN_NOTE}&tr=${orderId}`;
  //   uri = uri.replace(' ', '+');
  //   const options={
  //     action: this.webIntent.ACTION_VIEW,
  //       url: uri,
  //   }
  //   this.webIntent.startActivityForResult(options).then(
  //     onSuccess=>{
  //       console.log("Success",onSuccess);
  //     },

  //      onError=>{
  //        console.log("chkingError"+onError)
  //      }
  //     );

  // }

  // getRandomString() {
  //   const len = 10;
  //   const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
  //   let ans = '';
  //   for (let i = len; i > 0; i--) {
  //       ans += arr[Math.floor(Math.random() * arr.length)];
  //   }
  //   return ans;
  // }

  
 