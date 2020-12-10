import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinActividadPageRoutingModule } from './fin-actividad-routing.module';

import { FinActividadPage } from './fin-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinActividadPageRoutingModule
  ],
  declarations: [FinActividadPage]
})
export class FinActividadPageModule {}
