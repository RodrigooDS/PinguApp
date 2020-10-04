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
  },  {
    path: 'leccion',
    loadChildren: () => import('./leccion/leccion.module').then( m => m.LeccionPageModule)
  },
  {
    path: 'asociacion',
    loadChildren: () => import('./click-escuchar/asociacion/asociacion.module').then( m => m.AsociacionPageModule)
  },
  {
    path: 'completacion',
    loadChildren: () => import('./click-escuchar/completacion/completacion.module').then( m => m.CompletacionPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadPageRoutingModule {}
