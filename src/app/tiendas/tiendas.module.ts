import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendasPageRoutingModule } from './tiendas-routing.module';

import { TiendasPage } from './tiendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendasPageRoutingModule
  ],
  declarations: [TiendasPage]
})
export class TiendasPageModule {}
