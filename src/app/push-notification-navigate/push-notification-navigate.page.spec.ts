import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushNotificationNavigatePage } from './push-notification-navigate.page';

describe('PushNotificationNavigatePage', () => {
  let component: PushNotificationNavigatePage;
  let fixture: ComponentFixture<PushNotificationNavigatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushNotificationNavigatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushNotificationNavigatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
