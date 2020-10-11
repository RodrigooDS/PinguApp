import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeEstadisticaPageRoutingModule } from './ce-estadistica-routing.module';

import { CeEstadisticaPage } from './ce-estadistica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeEstadisticaPageRoutingModule
  ],
  declarations: [CeEstadisticaPage]
})
export class CeEstadisticaPageModule {}
