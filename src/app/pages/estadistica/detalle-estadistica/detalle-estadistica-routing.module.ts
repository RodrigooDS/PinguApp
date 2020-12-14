import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEstadisticaPage } from './detalle-estadistica.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEstadisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEstadisticaPageRoutingModule {}
