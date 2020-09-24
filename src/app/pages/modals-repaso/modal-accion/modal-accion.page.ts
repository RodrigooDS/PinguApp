import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-accion',
  templateUrl: './modal-accion.page.html',
  styleUrls: ['./modal-accion.page.scss'],
})
export class ModalAccionPage implements OnInit {

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
