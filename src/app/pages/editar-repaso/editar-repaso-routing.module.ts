import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRepasoPage } from './editar-repaso.page';
import { RepasoPage } from './repaso/repaso.page';
import { AgregarRepasoPage } from './agregar-repaso/agregar-repaso.page';

const routes: Routes = [
  {
    path: '',
    component: EditarRepasoPage
  },
  {
    path: 'repaso', component: RepasoPage,
    loadChildren: () => import('./repaso/repaso.module').then( m => m.RepasoPageModule)
  },
  {
    path: 'agregar-repaso', component: AgregarRepasoPage,
    loadChildren: () => import('./agregar-repaso/agregar-repaso.module').then( m => m.AgregarRepasoPageModule)
  },
  {
    path: 'cargar-repaso',
    loadChildren: () => import('./cargar-repaso/cargar-repaso.module').then( m => m.CargarRepasoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRepasoPageRoutingModule {}
