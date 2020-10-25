import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAccionPage } from './modal-accion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAccionPageRoutingModule {}
