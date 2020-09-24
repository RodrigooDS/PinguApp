import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.page.html',
  styleUrls: ['./modal-actividad.page.scss'],
})
export class ModalActividadPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  salirSinGuardar(){
    this.modalCtrl.dismiss();
  }

  guardar(){
    this.modalCtrl.dismiss({
    });
  }

}
