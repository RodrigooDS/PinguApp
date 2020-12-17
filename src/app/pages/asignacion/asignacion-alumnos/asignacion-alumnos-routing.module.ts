import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignacionAlumnosPage } from './asignacion-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AsignacionAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionAlumnosPageRoutingModule {}
