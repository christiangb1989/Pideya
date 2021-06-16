import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {GoogleMapsModule} from '@angular/google-maps';
import { RutaPageRoutingModule } from './ruta-routing.module';

import { RutaPage } from './ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [RutaPage]
})
export class RutaPageModule {}
