import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeAsociarPageRoutingModule } from './ce-asociar-routing.module';

import { CeAsociarPage } from './ce-asociar.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeAsociarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CeAsociarPage]
})
export class CeAsociarPageModule {}
