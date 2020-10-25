import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarRepasoPage } from './cargar-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: CargarRepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarRepasoPageRoutingModule {}
