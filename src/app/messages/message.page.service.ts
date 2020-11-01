import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from "rxjs/operators";
import { DataFromFirebaseCalls } from '../Modal/DataFromFirebaseCalls';




@Injectable({providedIn: 'root'})
export class MessagePageServices{
    url = 'https://cors-anywhere.herokuapp.com/https://cashcrow-c3ce7.firebaseio.com/Mastersheet';

    constructor (private http:HttpClient){}

    gotdata(){

  
     
        // let database =  firebase.database();
        //  let refx      =  database.ref('Mastersheet/Telegram Calls/Calls'); 
         
       return this.http.get<DataFromFirebaseCalls>(this.url)

          
          
       
    
    
    }



}
