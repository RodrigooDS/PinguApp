import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormregistroComponent } from './formregistro/formregistro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FormloginComponent } from './formlogin/formlogin.component';
import { FormforgotpasswordComponent } from './formforgotpassword/formforgotpassword.component';



@NgModule({
  declarations: [
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormforgotpasswordComponent,
      
  ],
  exports:[
    FormregistroComponent,
    HeaderComponent,
    FormloginComponent,
    FormforgotpasswordComponent,
    
    
    
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
