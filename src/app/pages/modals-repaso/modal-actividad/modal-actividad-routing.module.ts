import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalActividadPage } from './modal-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalActividadPageRoutingModule {}
