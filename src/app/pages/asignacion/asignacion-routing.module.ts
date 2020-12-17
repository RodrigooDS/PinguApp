import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignacionPage } from './asignacion.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AsignacionPage
  },
  {
    path: 'asignacion-actividad',
    loadChildren: () => import('./asignacion-actividad/asignacion-actividad.module').then( m => m.AsignacionActividadPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignacion-agregar-alumno',
    loadChildren: () => import('./asignacion-agregar-alumno/asignacion-agregar-alumno.module').then( m => m.AsignacionAgregarAlumnoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignacion-alumnos',
    loadChildren: () => import('./asignacion-alumnos/asignacion-alumnos.module').then( m => m.AsignacionAlumnosPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionPageRoutingModule {}
