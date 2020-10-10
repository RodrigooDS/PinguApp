import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentsModule } from '../../../../components/components.module';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit { 

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
