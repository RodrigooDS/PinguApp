import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAlumnoPageRoutingModule } from './agregar-alumno-routing.module';

import { AgregarAlumnoPage } from './agregar-alumno.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAlumnoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarAlumnoPage]
})
export class AgregarAlumnoPageModule {}
