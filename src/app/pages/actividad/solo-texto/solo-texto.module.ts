import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoloTextoPageRoutingModule } from './solo-texto-routing.module';

import { SoloTextoPage } from './solo-texto.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoloTextoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SoloTextoPage]
})
export class SoloTextoPageModule {}
