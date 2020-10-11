import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeAsociarPage } from './ce-asociar.page';

const routes: Routes = [
  {
    path: '',
    component: CeAsociarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeAsociarPageRoutingModule {}
