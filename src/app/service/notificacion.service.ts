import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(
    private oneSignal: OneSignal,
    public http:HttpClient
    ) { }
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

  test(msg, title, id){
      alert(id)
      console.log(typeof id);
  }
  sendNotification(msg, title, id) {

    const body = {
      app_id: 'bcbee943-3235-47bf-93e0-2a6d785224f0',
      include_player_ids: [id],
      headings: { en: title },
      contents: { en: msg },
      data: { task: msg }
    };

    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic NjVkZWRlYTctNmNlYy00NTljLTlkMzAtZmRjNmIzZTVjYTk4')
    };

    return this.http.post('https://onesignal.com/api/v1/notifications', body, header).subscribe((res)=>{
      console.log(res);
      
    });

  }
}
