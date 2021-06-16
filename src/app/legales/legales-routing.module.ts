import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalesPage } from './legales.page';

const routes: Routes = [
  {
    path: '',
    component: LegalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalesPageRoutingModule {}
