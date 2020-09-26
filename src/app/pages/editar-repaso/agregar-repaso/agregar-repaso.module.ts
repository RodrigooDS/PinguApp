import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRepasoPageRoutingModule } from './agregar-repaso-routing.module';

import { AgregarRepasoPage } from './agregar-repaso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRepasoPageRoutingModule,
    
  ],
  declarations: [AgregarRepasoPage]
})
export class AgregarRepasoPageModule {}
