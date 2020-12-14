import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEstadisticaPageRoutingModule } from './ver-estadistica-routing.module';

import { VerEstadisticaPage } from './ver-estadistica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEstadisticaPageRoutingModule
  ],
  declarations: [VerEstadisticaPage]
})
export class VerEstadisticaPageModule {}
