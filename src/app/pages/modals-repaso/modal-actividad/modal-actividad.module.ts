import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalActividadPageRoutingModule } from './modal-actividad-routing.module';

import { ModalActividadPage } from './modal-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalActividadPageRoutingModule
  ],
  declarations: [ModalActividadPage]
})
export class ModalActividadPageModule {}
