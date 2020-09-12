import { Observable } from '../../../node_modules/rxjs';
import { AuthResponseData } from '../Modal/auth-response-data';


export abstract class AppGateway {
  abstract Signup(email,password): Observable<AuthResponseData>;
  
}