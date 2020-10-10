import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaInfoPage } from './estadistica-info.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaInfoPageRoutingModule {}
