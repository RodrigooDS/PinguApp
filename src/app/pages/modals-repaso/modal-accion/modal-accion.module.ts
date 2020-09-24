import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAccionPageRoutingModule } from './modal-accion-routing.module';

import { ModalAccionPage } from './modal-accion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAccionPageRoutingModule
  ],
  declarations: [ModalAccionPage]
})
export class ModalAccionPageModule {}
