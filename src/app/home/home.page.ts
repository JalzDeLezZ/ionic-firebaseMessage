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
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.pushService.requestPermissions();

      FirebaseMessaging.addListener('notificationReceived', (event: any) => {
        this.toastController
          .create({
            message: event.title,
            duration: 3000,
          })
          .then((toast) => {
            toast.present();
          });
      });
    });

    FirebaseMessaging.addListener("notificationActionPerformed", (event) => { });
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
}
