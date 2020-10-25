import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarActividadPageRoutingModule } from './editar-actividad-routing.module';

import { EditarActividadPage } from './editar-actividad.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarActividadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditarActividadPage]
})
export class EditarActividadPageModule {}
