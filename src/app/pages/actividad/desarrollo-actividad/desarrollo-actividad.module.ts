import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesarrolloActividadPageRoutingModule } from './desarrollo-actividad-routing.module';

import { DesarrolloActividadPage } from './desarrollo-actividad.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesarrolloActividadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DesarrolloActividadPage]
})
export class DesarrolloActividadPageModule {}
