import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceAsociarPageRoutingModule } from './ace-asociar-routing.module';

import { AceAsociarPage } from './ace-asociar.page';
import { ComponentsModule } from '../../../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceAsociarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AceAsociarPage]
})
export class AceAsociarPageModule {}
