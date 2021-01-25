import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushNotificationNavigatePageRoutingModule } from './push-notification-navigate-routing.module';

import { PushNotificationNavigatePage } from './push-notification-navigate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushNotificationNavigatePageRoutingModule
  ],
  declarations: [PushNotificationNavigatePage]
})
export class PushNotificationNavigatePageModule {}
