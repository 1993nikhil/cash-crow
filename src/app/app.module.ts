import { HttpClientModule } from "@angular/common/http"; // Added after getting blank screen,below httpClientModule and Httpclient is also added in @ngmodule.imports
import {  NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppGateway } from "./app-gateway/app-gateway";
import { HttpAppGateway } from "./app-gateway/http-app-gateway";
import { firebaseConfig } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment.prod';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AppGateway, useClass: HttpAppGateway },
    WebIntent,
    // LocalNotifications
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
