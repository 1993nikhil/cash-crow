import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { map, tap } from "rxjs/operators";

import { AppGateway } from "../app-gateway/app-gateway";
import { AuthResponseData } from "../Modal/auth-response-data";
import { BehaviorSubject } from "rxjs";
import { User } from "../Modal/user.model";

// interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private _userIsAuthenticated = false;
  // private _userId = null;
  private _user = new BehaviorSubject<User>(null);
counterforprofile :any;
  get userIsAuthenticated() {
    // return this._userIsAuthenticated;
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient, private appgateway: AppGateway) {}
  signup(email: string, password: string) {
        this.counterforprofile=0;
    // return this.http.post<AuthResponseData>(
    //   `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
    //   { email: email, password: password, returnSecureToken: true }
    // );
  }
  login(email: string, password: string) {
    //this._userIsAuthenticated = true;
     this.counterforprofile=1;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
      { email: email, password: password }
    ).pipe(tap(this.setUserData.bind(this)));
  }
  logout() {
    this._user.next(null);
  }


private setUserData (userData: AuthResponseData){
      const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
  }

}
