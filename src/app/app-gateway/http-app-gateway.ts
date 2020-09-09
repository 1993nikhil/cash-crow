import { Injectable } from "@angular/core";
import { AppGateway } from "./app-gateway";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "../../../node_modules/rxjs";
import { environment } from "src/environments/environment.prod";
import { AuthResponseData } from "../Modal/auth-response-data";
import { tap } from "rxjs/operators";
import { User } from "../Modal/user.model";
import { AuthService } from "src/app/auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpAppGateway implements AppGateway {
    private _user = new BehaviorSubject<User>(null);
  private baseUri = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`;

  constructor(private httpClient: HttpClient) {}

  getLoginDetails(email: string, password: string): Observable<any> {
    // const url = "${this.baseUri}/addLead";
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   }),
    // };
    // const body = {lead: leadInfo};
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
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
        )
      );
  }
}
