import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreenService } from './services/splash-screen.service';
import { PushService } from './services/push-notify-firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreenService: SplashScreenService,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreenService.showHideAuto();
      this.pushService.initialSettings();
    });
  }
}
