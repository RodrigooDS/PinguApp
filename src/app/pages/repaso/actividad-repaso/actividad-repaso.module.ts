import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadRepasoPageRoutingModule } from './actividad-repaso-routing.module';

import { ActividadRepasoPage } from './actividad-repaso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadRepasoPageRoutingModule
  ],
  declarations: [ActividadRepasoPage]
})
export class ActividadRepasoPageModule {}
