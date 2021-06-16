import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    alert('Conductor reportado');
  }

}
