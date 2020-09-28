import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRepasoPage } from './editar-repaso.page';
import { RepasoPage } from './repaso/repaso.page';
import { AgregarRepasoPage } from './agregar-repaso/agregar-repaso.page';
import { CargarRepasoPage } from './cargar-repaso/cargar-repaso.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EditarRepasoPage
  },
  {
    path: 'repaso', component: RepasoPage,
    loadChildren: () => import('./repaso/repaso.module').then( m => m.RepasoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar-repaso', component: AgregarRepasoPage,
    loadChildren: () => import('./agregar-repaso/agregar-repaso.module').then( m => m.AgregarRepasoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cargar-repaso', component: CargarRepasoPage,
    loadChildren: () => import('./cargar-repaso/cargar-repaso.module').then( m => m.CargarRepasoPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRepasoPageRoutingModule {}
