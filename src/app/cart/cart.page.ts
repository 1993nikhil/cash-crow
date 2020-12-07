import { Component, OnInit } from "@angular/core";
import { WebIntent } from "@ionic-native/web-intent/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {

  totalPrice:number;
  UPI_ID:string;
  UPI_TXN_NOTE:string;
  UPI_NAME:string;
  TXN_Ref:string;
  currency:string='INR';
  tid:string;

  constructor(private webIntent: WebIntent,
              private router   : Router) {}

  ngOnInit() {}
  
weekly(){
        let url = 'upi://pay?pa=9798875584@okbizaxis&pn=Paritosh%20Pragya&tr=CahcrowWeekPckg&tid=Week-Cashcrow&am=1.00&cu=INR&tr=#Weekly';
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url
    };
    this.webIntent.startActivityForResult(options).then(success => {
      console.log(success);
      if(success.extras.Status == 'SUCCESS') {
        // SUCCESS RESPONSE
        alert('Thank you !! \n \n Your Payment was successful. \n Package Name :- CashCrow-Weekly ,\n Amount :- Rs 500 ,\n Payment method :- UPI\n\n Login Now...');
        this.router.navigateByUrl("/auth");
      
      } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
        // FAILED RESPONSE
        alert('Thank you !! \n \n Your Payment failed. Please try again ');
        this.router.navigateByUrl("/cart");
      } else {
        // FAILED RESPONSE
        alert('Thank you !! \n \n Your Payment failed. Please try again ');
        this.router.navigateByUrl("/cart");
      }
    }, error => {
      console.log(error);
    });
}
 

 monthly(){
  let url = 'upi://pay?pa=9798875584@okbizaxis&pn=Paritosh%20Pragya&tr=CahcrowMonthlyPackg&tid=Month-Cashcrow&am=1.00&cu=INR&tr=#Monthly';
const options = {
action: this.webIntent.ACTION_VIEW,
url
};
this.webIntent.startActivityForResult(options).then(success => {
console.log(success);
if(success.extras.Status == 'SUCCESS') {
  // SUCCESS RESPONSE
  alert('Thank you !! \n \n Your Payment was successful. \n Package Name :- CashCrow-Monthly ,\n Amount :- Rs 3000 ,\n Payment method :- UPI\n\n Login Now...');
  this.router.navigateByUrl("/auth");

} else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
  // FAILED RESPONSE
  alert('Thank you !! \n \n Your Payment failed. Please try again ');
  this.router.navigateByUrl("/cart");
} else {
  // FAILED RESPONSE
  alert('Thank you !! \n \n Your Payment failed. Please try again ');
  this.router.navigateByUrl("/cart");
}
}, error => {
console.log(error);
});
}

quarterly(){
  let url = 'upi://pay?pa=9798875584@okbizaxis&pn=Paritosh%20Pragya&tr=Cahcrow-Quarterly&tid=Quarter-Cashcrow&am=1.00&cu=INR&tr=#Quarterly';
const options = {
action: this.webIntent.ACTION_VIEW,
url
};
this.webIntent.startActivityForResult(options).then(success => {
console.log(success);
if(success.extras.Status == 'SUCCESS') {
  // SUCCESS RESPONSE
  alert('Thank you !! \n \n Your Payment was successful. \n Package Name :- CashCrow-Quarterly ,\n Amount :- Rs 8500 ,\n Payment method :- UPI\n\n Login Now...');
  this.router.navigateByUrl("/auth");

} else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
  // FAILED RESPONSE
  alert('Thank you !! \n \n Your Payment failed. Please try again ');
  this.router.navigateByUrl("/cart");
} else {
  // FAILED RESPONSE
  alert('Thank you !! \n \n Your Payment failed. Please try again ');
  this.router.navigateByUrl("/cart");
}
}, error => {
console.log(error);
});
}

}

//   weekly() {

//     // const tid = this.getRandomString();
//     // const orderId = this.getRandomString();
//     this.totalPrice = 10.00;
//     this.UPI_ID = '9470516408@upi';
//     this.UPI_NAME = 'ASHUTOSH%20KUMAR';
//     this.UPI_TXN_NOTE = 'CashCrow-Weekly%20Package';
//     this.TXN_Ref = '#Week-Cashcrow001'
//     const options = {
//       action: this.webIntent.ACTION_VIEW,
//       url:'upi://pay?pa=' + this.UPI_ID + '&pn=' + this.UPI_NAME + '&am=' + this.totalPrice + '&tn=' + this.UPI_TXN_NOTE + '&tr=' + this.TXN_Ref 
//       };

//       this.webIntent.startActivityForResult(options).then(
//         (success)=>{
        
//           console.log("Payment Succesfull",success);         
          
//         },         
//         err => {
//           alert('error block' + err);
//         }   
      
//       );
  
//     }

//   monthly() {
//     console.log("Inside UPI Function");
//     const options = {
//       action: this.webIntent.ACTION_VIEW,
//      // url:"www.facebook.com"
//        url: "upi://pay?pa=9470516408@upi&pn=ASHUTOSH%20KUMAR&tid=CashCrow-Monthly&am=10&cu=INR&tn=AppPayment",
//     };
//     this.webIntent.startActivityForResult(options).then(
//       (onSucces) => {
//         const pckgName ='Monthly'
//         const method   ='UPI'
//         const cost      = '3000'
//         console.log("Success", onSucces);
//         this.paymentSuccess(pckgName,cost,method);
        
//       },
//       (err) => {
//         console.log("Error" + err);
//       }
//     );
//   }

//   quarterly() {
//     console.log("Inside UPI Function");
//     const options = {
//       action: this.webIntent.ACTION_VIEW,
//       url: `upi://pay?pa=07ashutosh.kumar@scb&pn=Ashutosh+Kumar&tid=CashCrow-Quarterly&am=8500&cu=INR&tn=AppPayment`,
//     };
//     this.webIntent.startActivityForResult(options).then(
//       (onSucces) => {
//         const pckgName ='Quarterly'
//         const method   ='UPI'
//         const cost      = '8500'
//         console.log("Success", onSucces);
//         this.paymentSuccess(pckgName,cost,method);
//       },
//       (err) => {
//         console.log("Error" + err);
//       }
//     );
//   }
//   paymentSuccess(packgname: any,Amount:any, paymentMethod: string) {
//     alert(`Thank you !! \n \n Your Payment was successful. \n Package Name :- ${packgname} ,\n Amount :- ${Amount} ,\n Payment method :- ${paymentMethod}\n\n Login Now...`);
//     this.router.navigateByUrl("/auth");
//   }
// getRandomString() {
//     const len = 10;
//     const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
//     let ans = '';
//     for (let i = len; i > 0; i--) {
//         ans += arr[Math.floor(Math.random() * arr.length)];
//     }
//     return ans;
//   }


// }
  