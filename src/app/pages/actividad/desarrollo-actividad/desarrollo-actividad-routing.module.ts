import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesarrolloActividadPage } from './desarrollo-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: DesarrolloActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesarrolloActividadPageRoutingModule {}
