import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarActividadPageRoutingModule } from './cargar-actividad-routing.module';

import { CargarActividadPage } from './cargar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarActividadPageRoutingModule
  ],
  declarations: [CargarActividadPage]
})
export class CargarActividadPageModule {}
