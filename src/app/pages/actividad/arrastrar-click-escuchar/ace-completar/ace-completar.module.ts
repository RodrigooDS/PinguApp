import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceCompletarPageRoutingModule } from './ace-completar-routing.module';

import { AceCompletarPage } from './ace-completar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceCompletarPageRoutingModule
  ],
  declarations: [AceCompletarPage]
})
export class AceCompletarPageModule {}
