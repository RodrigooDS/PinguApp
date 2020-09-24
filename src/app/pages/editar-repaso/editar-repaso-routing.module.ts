import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRepasoPage } from './editar-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: EditarRepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRepasoPageRoutingModule {}
