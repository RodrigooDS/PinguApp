import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormregistroComponent } from './formregistro/formregistro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FormloginComponent } from './formlogin/formlogin.component';
import { FormforgotpasswordComponent } from './formforgotpassword/formforgotpassword.component';
import { CeParte1Component } from './actividad/click-escuchar/ce-parte1/ce-parte1.component';
import { CeParte2Component } from './actividad/click-escuchar/ce-parte2/ce-parte2.component';
import { AceParte1Component } from './actividad/arrastrar-click-escuchar/ace-parte1/ace-parte1.component';
import { AceParte2Component } from './actividad/arrastrar-click-escuchar/ace-parte2/ace-parte2.component';
import { FormRegistroAlumnoComponent } from './form-registro-alumno/form-registro-alumno.component';

@NgModule({
  declarations: [
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormRegistroAlumnoComponent,
    FormforgotpasswordComponent,
    CeParte1Component,
    CeParte2Component,
    AceParte1Component,
    AceParte2Component
  ],
  exports:[
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormRegistroAlumnoComponent,
    FormforgotpasswordComponent,
    CeParte1Component,
    CeParte2Component,
    AceParte1Component,
    AceParte2Component
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
