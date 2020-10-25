import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeEstadisticaPage } from './ce-estadistica.page';

const routes: Routes = [
  {
    path: '',
    component: CeEstadisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeEstadisticaPageRoutingModule {}
