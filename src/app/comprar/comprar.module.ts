import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprarPageRoutingModule } from './comprar-routing.module';

import { ComprarPage } from './comprar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprarPageRoutingModule
  ],
  declarations: [ComprarPage]
})
export class ComprarPageModule {}
