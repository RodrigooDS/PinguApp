import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeCompletarPageRoutingModule } from './ce-completar-routing.module';

import { CeCompletarPage } from './ce-completar.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeCompletarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CeCompletarPage]
})
export class CeCompletarPageModule {}
