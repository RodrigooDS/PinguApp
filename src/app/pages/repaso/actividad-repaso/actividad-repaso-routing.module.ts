import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadRepasoPage } from './actividad-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadRepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadRepasoPageRoutingModule {}
