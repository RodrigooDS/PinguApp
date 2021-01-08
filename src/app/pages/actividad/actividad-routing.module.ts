import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadPage } from './actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPage
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then( m => m.ActividadesPageModule)
  },
  {
    path: 'desarrollo-actividad',
    loadChildren: () => import('./desarrollo-actividad/desarrollo-actividad.module').then( m => m.DesarrolloActividadPageModule)
  },
  {
    path: 'fin-actividad',
    loadChildren: () => import('./fin-actividad/fin-actividad.module').then( m => m.FinActividadPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadPageRoutingModule {}
