import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalesPageRoutingModule } from './legales-routing.module';

import { LegalesPage } from './legales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalesPageRoutingModule
  ],
  declarations: [LegalesPage]
})
export class LegalesPageModule {}
