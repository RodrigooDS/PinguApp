import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormregistroComponent } from './formregistro/formregistro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    FormregistroComponent,
    HeaderComponent
  ],
  exports:[
    FormregistroComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
