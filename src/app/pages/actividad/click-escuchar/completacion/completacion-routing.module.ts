import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletacionPage } from './completacion.page';

const routes: Routes = [
  {
    path: '',
    component: CompletacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletacionPageRoutingModule {}
