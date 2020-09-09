import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormregistroComponent } from './formregistro/formregistro.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormregistroComponent
  ],
  exports:[
    FormregistroComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
