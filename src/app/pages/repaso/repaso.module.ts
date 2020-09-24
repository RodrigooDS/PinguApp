import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepasoPageRoutingModule } from './repaso-routing.module';

import { RepasoPage } from './repaso.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepasoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RepasoPage]
})
export class RepasoPageModule {}
