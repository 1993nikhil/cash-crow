import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'   
import { environment } from 'src/environments/environment.prod';

// interface AuthResponseData{
//   idToken : string;
//   email : string;
//   refreshToken : string;
//   expiresIn : string;
//   localId : string;
//   registered?:boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated=false;
  private _userId=null;
  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  constructor(){

  }
  // signup(email:string,password:string){
  //  return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,{email:email , password:password,returnSecureToken:true});
  // }
  login(){
    this._userIsAuthenticated=true;
  }
  logout(){
    this._userIsAuthenticated=false;
  }
}
