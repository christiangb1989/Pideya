import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraExitosaPageRoutingModule } from './compra-exitosa-routing.module';

import { CompraExitosaPage } from './compra-exitosa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraExitosaPageRoutingModule
  ],
  declarations: [CompraExitosaPage]
})
export class CompraExitosaPageModule {}
