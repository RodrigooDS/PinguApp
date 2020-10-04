import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsociacionPageRoutingModule } from './asociacion-routing.module';

import { AsociacionPage } from './asociacion.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsociacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AsociacionPage]
})
export class AsociacionPageModule {}
