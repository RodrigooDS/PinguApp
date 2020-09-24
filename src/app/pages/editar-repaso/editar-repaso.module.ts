import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarRepasoPageRoutingModule } from './editar-repaso-routing.module';

import { EditarRepasoPage } from './editar-repaso.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarRepasoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarRepasoPage]
})
export class EditarRepasoPageModule {}
