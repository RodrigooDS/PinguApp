import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarActividadPage } from './agregar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarActividadPageRoutingModule {}
