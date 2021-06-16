import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private storage: Storage,
  ) { }
  nombres: any = '';
  apellidos: any = '';
  email: any = '';
  telefono: any = '';
  direccion: any = '';

  ngOnInit() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.nombres = response.user_data.nombres;
        this.apellidos = response.user_data.apellidos;
        this.email = response.user_data.email;
        this.telefono = response.user_data.telefono;
        this.direccion = response.user_data.direccion;
      }
    });
  }

}
