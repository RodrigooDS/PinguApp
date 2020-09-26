import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarRepasoPageRoutingModule } from './cargar-repaso-routing.module';

import { CargarRepasoPage } from './cargar-repaso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarRepasoPageRoutingModule
  ],
  declarations: [CargarRepasoPage]
})
export class CargarRepasoPageModule {}
