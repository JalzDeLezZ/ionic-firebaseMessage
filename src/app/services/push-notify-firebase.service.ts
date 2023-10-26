import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor() {}

  checkPermissions = async () => {
    const result = await FirebaseMessaging.checkPermissions();
    return result.receive;
  };

  requestPermissions = async () => {
    const result = await FirebaseMessaging.requestPermissions();
    return result.receive;
  };

  getToken = async () => {
    const result = await FirebaseMessaging.getToken();
    return result.token;
  };

  deleteToken = async () => {
    await FirebaseMessaging.deleteToken();
  };

  getDeliveredNotifications = async () => {
    const result = await FirebaseMessaging.getDeliveredNotifications();
    return result.notifications;
  };

  // removeDeliveredNotifications = async () => {
  //   await FirebaseMessaging.removeDeliveredNotifications({
  //     ids: ['798dfhliblqew89pzads'],
  //   });
  // };

  removeAllDeliveredNotifications = async () => {
    await FirebaseMessaging.removeAllDeliveredNotifications();
  };

  subscribeToTopic = async () => {
    await FirebaseMessaging.subscribeToTopic({ topic: 'news' });
  };

  unsubscribeFromTopic = async () => {
    await FirebaseMessaging.unsubscribeFromTopic({ topic: 'news' });
  };

  addTokenReceivedListener = async () => {
    await FirebaseMessaging.addListener('tokenReceived', (event) => {
      console.log('tokenReceived', { event });
    });
  };

  addNotificationReceivedListener = async () => {
    await FirebaseMessaging.addListener('notificationReceived', (event) => {
      console.log('notificationReceived', { event });
    });
  };

  addNotificationActionPerformedListener = async () => {
    await FirebaseMessaging.addListener(
      'notificationActionPerformed',
      (event) => {
        console.log('notificationActionPerformed', { event });
      }
    );
  };

  removeAllListeners = async () => {
    await FirebaseMessaging.removeAllListeners();
  };

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  initialSettings = async () => {
    await this.addTokenReceivedListener();
    await this.addNotificationReceivedListener();
    await this.addNotificationActionPerformedListener();
  };

  saveToken = async () => {
    const token = await this.getToken();
    console.log('token', token);
  };
}
