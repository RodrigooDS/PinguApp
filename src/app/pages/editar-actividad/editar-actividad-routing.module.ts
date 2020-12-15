import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarActividadPage } from './editar-actividad.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EditarActividadPage
  },
  {
    path: 'actividad',
    loadChildren: () => import('./actividad/actividad.module').then( m => m.ActividadPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar-actividad',
    loadChildren: () => import('./agregar-actividad/agregar-actividad.module').then( m => m.AgregarActividadPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cargar-actividad',
    loadChildren: () => import('./cargar-actividad/cargar-actividad.module').then( m => m.CargarActividadPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarActividadPageRoutingModule {}
