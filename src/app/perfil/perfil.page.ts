import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private api:ApiService,
    public loadingController: LoadingController
  ) { }
  nombres: any = '';
  apellidos: any = '';
  email: any = '';
  telefono: any = '';
  direccion: any = '';

  ngOnInit() {
    this.presentLoading();
    const userID = localStorage.getItem('userId');
    this.http.get(this.api.apiUrl+'perfil/'+userID).subscribe((res:any)=>{
      this.nombres = res.user_data.nombres;
      this.apellidos = res.user_data.apellidos;
      this.email = res.user_data.email;
      this.telefono = res.user_data.telefono;
      this.direccion = res.user_data.direccion;
      setTimeout(()=>{
        this.loadingController.dismiss();
      },1000)
      

    }, err =>{
      alert('¡Ups! Algo salió mal')
      this.loadingController.dismiss();
    })
  }

  saveProfile(){
    this.presentLoading();
    const param = {
      idUser: localStorage.getItem('userId'),
      nombres:  this.nombres,
      apellidos:  this.apellidos,
      email:  this.email,
      telefono: this.telefono,
      direccion: this.direccion
    }

    this.http.post(this.api.apiUrl+'UserUpdate', param).subscribe((res)=>{
      this.loadingController.dismiss();
    }, err =>{
      alert('¡Ups! Algo salió mal')
      this.loadingController.dismiss();
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargar...',
      duration: 20000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
