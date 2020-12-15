import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignacionActividadPageRoutingModule } from './asignacion-actividad-routing.module';

import { AsignacionActividadPage } from './asignacion-actividad.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignacionActividadPageRoutingModule,
    PipesModule
  ],
  declarations: [AsignacionActividadPage]
})
export class AsignacionActividadPageModule {}
