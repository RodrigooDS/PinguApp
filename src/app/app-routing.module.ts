// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then(m => m.TablinksPageModule)
  },  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
