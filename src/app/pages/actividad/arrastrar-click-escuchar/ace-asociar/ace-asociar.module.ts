import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceAsociarPageRoutingModule } from './ace-asociar-routing.module';

import { AceAsociarPage } from './ace-asociar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceAsociarPageRoutingModule
  ],
  declarations: [AceAsociarPage]
})
export class AceAsociarPageModule {}
