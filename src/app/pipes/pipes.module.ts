import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroProfesoresPipe } from './filtro-profesores.pipe';
import { FiltroActividadesPipe } from './filtro-actividades.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    FiltroProfesoresPipe,
    FiltroActividadesPipe
  ],
  exports: [
    FiltroPipe,
    FiltroProfesoresPipe,
    FiltroActividadesPipe
  ]
})
export class PipesModule { }
