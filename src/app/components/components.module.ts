import { ContenidoSoloTextoComponent } from './editar-actividad/contenido-solo-texto/contenido-solo-texto.component';
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
import { FormRegistroAlumnoComponent } from './form-registro-alumno/form-registro-alumno.component';
import { ContenidoSoloImagenesComponent } from './editar-actividad/contenido-solo-imagenes/contenido-solo-imagenes.component';
import { ContenidoTextoImagenComponent } from './editar-actividad/contenido-texto-imagen/contenido-texto-imagen.component';
import { ListaSoloImagenesComponent } from './editar-actividad/lista-solo-imagenes/lista-solo-imagenes.component';
import { ListaSoloTextoComponent } from './editar-actividad/lista-solo-texto/lista-solo-texto.component';
import { ListaSoloTextoImagenComponent } from './editar-actividad/lista-solo-texto-imagen/lista-solo-texto-imagen.component';
import { SoloTextoComponent } from './actividad/solo-texto/solo-texto.component';
import { SoloImagenesComponent } from './actividad/solo-imagenes/solo-imagenes.component';
import { TextoImagenComponent } from './actividad/texto-imagen/texto-imagen.component';

@NgModule({
  declarations: [
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormRegistroAlumnoComponent,
    FormforgotpasswordComponent,
    CeParte1Component,
    CeParte2Component,
    ContenidoSoloImagenesComponent,
    ContenidoSoloTextoComponent,
    ContenidoTextoImagenComponent,
    ListaSoloImagenesComponent,
    ListaSoloTextoComponent,
    ListaSoloTextoImagenComponent,
    SoloTextoComponent,
    SoloImagenesComponent,
    TextoImagenComponent
  ],
  exports:[
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormRegistroAlumnoComponent,
    FormforgotpasswordComponent,
    CeParte1Component,
    CeParte2Component,
    ContenidoSoloImagenesComponent,
    ContenidoSoloTextoComponent,
    ContenidoTextoImagenComponent,
    ListaSoloImagenesComponent,
    ListaSoloTextoComponent,
    ListaSoloTextoImagenComponent,
    SoloTextoComponent,
    SoloImagenesComponent,
    TextoImagenComponent
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
