import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../api.service'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //fbLogin: FacebookLoginPlugin;
  users = null;
  token = null;
  userInfo = null;
  userId:string;
  constructor(
    public http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private apiService: ApiService,
    private storage:Storage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private firebaseAuthentication: FirebaseAuthentication,
    public OneSignal:OneSignal,
    public NotificacionService:NotificacionService
    ) {
      
      
      this.storage.get('USER_INFO').then((response)=>{
        if(response){
          this.router.navigate(['/tabs/tab1']);
        }
      })

    }
  user:any = {};
  ngOnInit() {
  }

  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  backpage(){
    this.router.navigate(['/'])
  }
  login(){
    // const param = {
    //   'phone' : this.user.phone,
    //   'fcm' : this.userId
    // };
    // this.http.post(this.apiService.apiUrl+'login', param).subscribe((userData:any)=>{
    //   console.log('---------++++++------->',userData);
    //   if (userData.status) {
    //     this.saveLogin(userData)
    //   }
    //   this.loadingController.dismiss();
    // })
  
    this.presentLoading();
    this.firebaseAuthentication.verifyPhoneNumber('+51'+this.user.phone, 3000).then((virficationID)=>{
      this.presentAlertPrompt(virficationID)
      this.loadingController.dismiss();
    })
    
  }

  async presentAlertPrompt(virficationID) {
    this.userId =  await this.NotificacionService.userId;
    const prompt = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingresar código',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Ingresar código'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (response) => {
          }
        }, {
          text: 'Ok',
          handler: (response) => {
            this.presentLoading();
            this.firebaseAuthentication.signInWithVerificationId(virficationID, response.codigo).then( res =>{
              console.log('---------------->',res);
              
              if(res === 'OK'){
                const param = {
                  phone : this.user.phone,
                  fcm : this.userId
                };
                this.http.post(this.apiService.apiUrl+'login', param).subscribe((userData:any)=>{
                  console.log('---------++++++------->',userData);
                  if (userData.status) {
                    this.saveLogin(userData)
                  }
                  this.loadingController.dismiss();
                },err =>{
                  this.presentAlert('¡Ups! Algo salió mal++++ ' + JSON.stringify(err) );
                  this.loadingController.dismiss();
                })
              }else{
                this.presentAlert('Código incorrecto!');
                this.loadingController.dismiss();
              }
            },err =>{
              this.presentAlert('¡Ups! Algo salió mal-------');
              this.loadingController.dismiss();
            })
          }
        }
      ]
    });

    await prompt.present();
  }

  saveLogin(infoLogin){
    this.storage.set('USER_INFO', infoLogin).then((userInformer)=>{
      localStorage.setItem('userId', userInformer.user_data.id)
      console.log('============>',userInformer.user_data.id)
      this.router.navigate(['/tabs/tab1'])
    })
  }

  async presentAlert(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

}
