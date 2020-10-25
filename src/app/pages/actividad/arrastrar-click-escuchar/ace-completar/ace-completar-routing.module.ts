import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceCompletarPage } from './ace-completar.page';

const routes: Routes = [
  {
    path: '',
    component: AceCompletarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceCompletarPageRoutingModule {}
