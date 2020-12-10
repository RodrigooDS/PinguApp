import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinActividadPage } from './fin-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: FinActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinActividadPageRoutingModule {}
