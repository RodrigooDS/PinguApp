import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceAsociarPage } from './ace-asociar.page';

const routes: Routes = [
  {
    path: '',
    component: AceAsociarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceAsociarPageRoutingModule {}
