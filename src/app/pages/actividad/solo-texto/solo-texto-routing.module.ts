import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoloTextoPage } from './solo-texto.page';

const routes: Routes = [
  {
    path: '',
    component: SoloTextoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoloTextoPageRoutingModule {}
