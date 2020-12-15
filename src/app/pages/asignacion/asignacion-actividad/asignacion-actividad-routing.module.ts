import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignacionActividadPage } from './asignacion-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: AsignacionActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionActividadPageRoutingModule {}
