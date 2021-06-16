import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

   
  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(data) {
    var dummy_response = data;
      if(data.status){
        this.storage.set('USER_INFO', dummy_response).then(() => {
          this.router.navigate(['/tabs/tab1']);
          this.authState.next(true);
        });
      }else{
        this.router.navigate(['login']);
        this.presentAlert();
        this.authState.next(false);
      }
      
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Usuario o contraseña incorrecta',
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['/']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
