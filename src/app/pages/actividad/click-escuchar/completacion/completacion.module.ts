import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletacionPageRoutingModule } from './completacion-routing.module';

import { CompletacionPage } from './completacion.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CompletacionPage]
})
export class CompletacionPageModule {}
