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
    path: 'ce-asociar',
    loadChildren: () => import('./click-escuchar/ce-asociar/ce-asociar.module').then( m => m.CeAsociarPageModule)
  },
  {
    path: 'ce-completar',
    loadChildren: () => import('./click-escuchar/ce-completar/ce-completar.module').then( m => m.CeCompletarPageModule)
  },
  {
    path: 'ce-estadistica',
    loadChildren: () => import('./click-escuchar/ce-estadistica/ce-estadistica.module').then( m => m.CeEstadisticaPageModule)
  },
  {
    path: 'ace-asociar',
    loadChildren: () => import('./arrastrar-click-escuchar/ace-asociar/ace-asociar.module').then( m => m.AceAsociarPageModule)
  },
  {
    path: 'ace-completar',
    loadChildren: () => import('./arrastrar-click-escuchar/ace-completar/ace-completar.module').then( m => m.AceCompletarPageModule)
  },  {
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
