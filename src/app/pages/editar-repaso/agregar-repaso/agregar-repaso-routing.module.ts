import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarRepasoPage } from './agregar-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRepasoPageRoutingModule {}
