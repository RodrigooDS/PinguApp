import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeccionPageRoutingModule } from './leccion-routing.module';

import { LeccionPage } from './leccion.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeccionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LeccionPage]
})
export class LeccionPageModule {}
