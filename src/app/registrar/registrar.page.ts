import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/Authentication.service';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  picture;
  name;
  email;
  user:any = {};
  userInfo:any = {};
  //fbLogin: FacebookLoginPlugin;
  users = null;
  token = null;
  term;
  constructor(
    private http:HttpClient,
    private authService: AuthenticationService,
    private apiService: ApiService,
    private storage:Storage,
    private router:Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private firebaseAuthentication: FirebaseAuthentication
  ) {

  }

  ngOnInit() {
  }
  backpage(){
    this.router.navigate(['/'])
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  registar(){
    console.log(this.term);

    if (!this.term) {
      alert('Aceptar terminos y condiciones')
      return false;
    }


    if( this.user.nombres && 
      this.user.apellidos && 
      this.user.telefono && 
      this.user.email){

      const postData = {
        nombres : this.user.nombres,
        apellidos : this.user.apellidos,
        telefono : this.user.telefono,
        email : this.user.email,
        password : this.user.clave
      }

      this.http.post(this.apiService.apiUrl+'registrar', postData).subscribe((response)=>{
        this.firebaseAuthentication.verifyPhoneNumber('+51'+this.user.phone, 3000).then((virficationID)=>{
          this.presentAlertPrompt(virficationID)
        })
      },(err)=>{

      })
      this.router.navigate(['legales']);

    }else{
      // Respuesta si los campos no estan llenos
    }

 
  }

  async presentAlertPrompt(virficationID) {
    const alert = await this.alertController.create({
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
            console.log(response.codigo);    
          }
        }, {
          text: 'Ok',
          handler: (response) => {
            
            this.firebaseAuthentication.signInWithVerificationId(virficationID, response.codigo).then( res =>{
              if(res === 'OK'){
                this.http.post(this.apiService.apiUrl+'login', {'telefono' : this.user.telefono}).subscribe((userData:any)=>{
                  if (userData.status) {
                    this.saveLogin(userData)
                  }else{
                    this.presentAlert('Usuario no registrado!');
                  }
                })
              }else{
                this.presentAlert('Código incorrecto!');
              }

            })
      
            console.log(response.codigo);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  saveLogin(infoLogin){
    this.storage.set('USER_INFO', infoLogin).then(()=>{
      this.router.navigate(['/tabs/tab1'])
    })
  }
}
