import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor() { }


  resetPassword(email:string):Promise<void>{

    return firebase.auth().sendPasswordResetEmail(email);
  }
}
