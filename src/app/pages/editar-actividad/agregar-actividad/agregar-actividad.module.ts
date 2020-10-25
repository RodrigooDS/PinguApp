import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarActividadPageRoutingModule } from './agregar-actividad-routing.module';

import { AgregarActividadPage } from './agregar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarActividadPageRoutingModule
  ],
  declarations: [AgregarActividadPage]
})
export class AgregarActividadPageModule {}
