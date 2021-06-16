import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-legales',
  templateUrl: './legales.page.html',
  styleUrls: ['./legales.page.scss'],
})
export class LegalesPage implements OnInit {
  acepto:any;
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private httpClient:HttpClient,
    private storage:Storage,
    private apiService:ApiService,
    private authService: AuthenticationService,
    private router:Router
    ) 
  { 

    this.storage.get('pre_registro').then( res =>{
      if(!res){
        this.router.navigate(['/']);
      }
      
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
  }

  async presentAlert(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '!Importante¡',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  registerFinal(){

    if(this.acepto){
      this.storage.get('pre_registro').then( response =>{
        this.presentLoading();
        if(response){
          this.httpClient.post(this.apiService.apiUrl+"registrar", response).subscribe((res:any)=>{
              if(res.status){
                this.authService.login(res)
                setTimeout( ()=>{
                  this.loadingController.dismiss();
                },1000)
              }else{
                setTimeout( ()=>{
                  this.loadingController.dismiss();
                  this.presentAlert('Usuario Registrado')
                },1000)
              }
          })
        }else{
          this.presentAlert('Debe aceptar los términos y condiciones para finalizar el registro.');
        }
        
      })
      
    }else{
      this.presentAlert('Debe aceptar los términos y condiciones para finalizar el registro.');
    }
    
    
  }

}
