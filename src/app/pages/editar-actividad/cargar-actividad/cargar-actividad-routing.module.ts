import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarActividadPage } from './cargar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: CargarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarActividadPageRoutingModule {}
