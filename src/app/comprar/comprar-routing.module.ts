import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprarPage } from './comprar.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprarPageRoutingModule {}
