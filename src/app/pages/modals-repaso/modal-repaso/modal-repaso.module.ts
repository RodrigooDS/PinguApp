import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRepasoPageRoutingModule } from './modal-repaso-routing.module';

import { ModalRepasoPage } from './modal-repaso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRepasoPageRoutingModule
  ],
  declarations: [ModalRepasoPage]
})
export class ModalRepasoPageModule {}
