import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRepasoPage } from './modal-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRepasoPageRoutingModule {}
