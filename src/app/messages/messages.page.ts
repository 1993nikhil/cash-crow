import { HttpClient } from '@angular/common/http';

import {Component, ViewChild, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { url } from 'inspector';

// import {  } from 'rxjs';
import {MessagePageServices } from "./message.page.service";



export interface Data {
  
  movies: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  public data: Data;
  public columns: any;
  public rows: any;
  public x:any;
   url = 'https://cashcrow-c3ce7.firebaseio.com/Mastersheet/Telegram Calls/Calls';
   constructor(private http:HttpClient,
              private db: AngularFireDatabase,
              private Msgpgsrvc :MessagePageServices)
                 {
                   {
                       this.columns = [
                                        { "name": 'Calls' }
        
                                      ];
  
                    //                      this.http.get<Data>("../../assets/movies.json")
                    //                      .subscribe((res) => {
                    //                       console.log(res)
                    //                       this.rows = res.Calls;
                    //                                 });
                    // 
                  }
 
                  }
    ngOnInit(){
      this.x= this.datafromFirebase();
    // this.Msgpgsrvc.gotdata().subscribe((res)=>{
    //   this.x = res
    //   console.log(this.x)
    // });
      
    }

    datafromFirebase(){
      // this.Msgpgsrvc.gotdata().subscribe(
        
      //   (res)=>{
      //     const convdata = res 
      //     console.log(convdata)});

    
      
         var database = firebase.database();

        var ref = database.refFromURL(this.url);
       ref.on('value',gotData);
      
       function gotData(data)
       {
       var Data = data.val();
       var keys = Object.keys(Data);
      
       console.log(Data);
       return Data;
      //  return Data ;

       }
    
 
   
  
    

  }


}
