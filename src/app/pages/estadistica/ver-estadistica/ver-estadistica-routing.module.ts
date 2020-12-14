import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEstadisticaPage } from './ver-estadistica.page';

const routes: Routes = [
  {
    path: '',
    component: VerEstadisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEstadisticaPageRoutingModule {}
