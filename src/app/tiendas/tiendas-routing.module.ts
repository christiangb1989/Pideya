import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendasPage } from './tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: TiendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendasPageRoutingModule {}
