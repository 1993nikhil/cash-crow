import { HttpClientModule } from "@angular/common/http"; // Added after getting blank screen,below httpClientModule and Httpclient is also added in @ngmodule.imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppGateway } from "./app-gateway/app-gateway";
import { HttpAppGateway } from "./app-gateway/http-app-gateway";
//import {  AuthPage } from "./auth/auth.page";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
   // AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AppGateway, useClass: HttpAppGateway },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
