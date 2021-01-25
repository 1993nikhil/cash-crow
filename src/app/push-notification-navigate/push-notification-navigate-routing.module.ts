import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushNotificationNavigatePage } from './push-notification-navigate.page';

const routes: Routes = [
  {
    path: '',
    component: PushNotificationNavigatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushNotificationNavigatePageRoutingModule {}
