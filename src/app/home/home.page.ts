import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from '../services/splash-screen.service';
import { PushService } from '../services/push-notify-firebase.service';
import { Platform, ToastController } from '@ionic/angular';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private splashScreenService: SplashScreenService,
    private pushService: PushService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.pushService.requestPermissions();

      this.pushService.initialSettings();
      // FirebaseMessaging.addListener('notificationReceived', (event: any) => {
      //   console.log("🚀 ~ HomePage ~ FirebaseMessaging.addListener ~ event:", event)
      // });
    });

    // FirebaseMessaging.addListener("notificationActionPerformed", (event) => { });
  }
  ngOnInit(): void {
    this.pushService.saveToken();
  }

  onShowSplasScreen = () => {
    this.splashScreenService.showHideAuto();
  };

  getToken = () => {
    this.pushService.saveToken();
  };

  onTest = async () => {
    const rest = await this.pushService.requestPermissions();
    console.log('🚀 ~ HomePage ~ onTest= ~ rest:', rest);
  };
}
