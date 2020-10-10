import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaInfoPageRoutingModule } from './estadistica-info-routing.module';

import { EstadisticaInfoPage } from './estadistica-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaInfoPageRoutingModule
  ],
  declarations: [EstadisticaInfoPage]
})
export class EstadisticaInfoPageModule {}
