import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private oneSignal: OneSignal) { }
  userId:string;
  notify(){
    this.oneSignal.startInit('bcbee943-3235-47bf-93e0-2a6d785224f0', '468567793700');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      console.log('recibido');
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('abierto');
    });
    
    this.oneSignal.getIds().then( info =>{
      this.userId = info.userId;
    })
    this.oneSignal.endInit();
  }
}
