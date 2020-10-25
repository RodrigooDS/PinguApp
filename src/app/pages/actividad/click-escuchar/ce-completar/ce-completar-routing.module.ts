import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeCompletarPage } from './ce-completar.page';

const routes: Routes = [
  {
    path: '',
    component: CeCompletarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeCompletarPageRoutingModule {}
