import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsociacionPage } from './asociacion.page';

const routes: Routes = [
  {
    path: '',
    component: AsociacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsociacionPageRoutingModule {}
