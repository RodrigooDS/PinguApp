import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignacionAgregarAlumnoPageRoutingModule } from './asignacion-agregar-alumno-routing.module';

import { AsignacionAgregarAlumnoPage } from './asignacion-agregar-alumno.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignacionAgregarAlumnoPageRoutingModule,
    PipesModule
  ],
  declarations: [AsignacionAgregarAlumnoPage]
})
export class AsignacionAgregarAlumnoPageModule {}
