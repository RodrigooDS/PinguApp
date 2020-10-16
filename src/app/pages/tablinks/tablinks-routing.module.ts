// tablinks-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'actividad',
        loadChildren: () => import('../actividad/actividad.module').then(m => m.ActividadPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'repaso',
        loadChildren: () => import('../repaso/repaso.module').then( m => m.RepasoPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then( m => m.UserPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'editar-repaso',
        loadChildren: () => import('../editar-repaso/editar-repaso.module').then( m => m.EditarRepasoPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'editar-actividad',
        loadChildren: () => import('../editar-actividad/editar-actividad.module').then( m => m.EditarActividadPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tablinks/actividad',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/actividad',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule { }
