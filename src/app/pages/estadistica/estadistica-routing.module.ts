import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaPage } from './estadistica.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaPage
  },
  {
    path: 'ver-estadistica',
    loadChildren: () => import('./ver-estadistica/ver-estadistica.module').then( m => m.VerEstadisticaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-estadistica',
    loadChildren: () => import('./detalle-estadistica/detalle-estadistica.module').then( m => m.DetalleEstadisticaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaPageRoutingModule {}
