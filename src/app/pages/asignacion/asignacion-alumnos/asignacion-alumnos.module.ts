import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignacionAlumnosPageRoutingModule } from './asignacion-alumnos-routing.module';

import { AsignacionAlumnosPage } from './asignacion-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignacionAlumnosPageRoutingModule
  ],
  declarations: [AsignacionAlumnosPage]
})
export class AsignacionAlumnosPageModule {}
