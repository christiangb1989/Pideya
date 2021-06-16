import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraExitosaPage } from './compra-exitosa.page';

const routes: Routes = [
  {
    path: '',
    component: CompraExitosaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraExitosaPageRoutingModule {}
