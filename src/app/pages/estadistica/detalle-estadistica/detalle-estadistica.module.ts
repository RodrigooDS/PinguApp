import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEstadisticaPageRoutingModule } from './detalle-estadistica-routing.module';

import { DetalleEstadisticaPage } from './detalle-estadistica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEstadisticaPageRoutingModule
  ],
  declarations: [DetalleEstadisticaPage]
})
export class DetalleEstadisticaPageModule {}
