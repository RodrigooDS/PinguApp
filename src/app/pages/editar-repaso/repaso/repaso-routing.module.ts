import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepasoPage } from './repaso.page';

const routes: Routes = [
  {
    path: '',
    component: RepasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepasoPageRoutingModule {}
