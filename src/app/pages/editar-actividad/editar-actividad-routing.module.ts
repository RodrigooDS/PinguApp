import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarActividadPage } from './editar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: EditarActividadPage
  },  {
    path: 'actividad',
    loadChildren: () => import('./actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'agregar-actividad',
    loadChildren: () => import('./agregar-actividad/agregar-actividad.module').then( m => m.AgregarActividadPageModule)
  },
  {
    path: 'cargar-actividad',
    loadChildren: () => import('./cargar-actividad/cargar-actividad.module').then( m => m.CargarActividadPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarActividadPageRoutingModule {}
