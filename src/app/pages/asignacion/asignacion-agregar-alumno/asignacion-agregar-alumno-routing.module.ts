import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignacionAgregarAlumnoPage } from './asignacion-agregar-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AsignacionAgregarAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionAgregarAlumnoPageRoutingModule {}
