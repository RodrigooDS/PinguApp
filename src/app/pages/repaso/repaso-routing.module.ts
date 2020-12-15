import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepasoPage } from './repaso.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RepasoPage
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then( m => m.ActividadesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'actividad-repaso',
    loadChildren: () => import('./actividad-repaso/actividad-repaso.module').then( m => m.ActividadRepasoPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepasoPageRoutingModule {}
