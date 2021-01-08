import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAccionPage } from '../modal-accion/modal-accion.page';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-modal-repaso',
  templateUrl: './modal-repaso.page.html',
  styleUrls: ['./modal-repaso.page.scss'],
})
export class ModalRepasoPage implements OnInit {

  @Input() tituloActividad: string;
  @Input() tipoCategoria: string;

    
  constructor(private modalCtrl: ModalController, 
              private authService: AuthService) { }

  ngOnInit() { }

  async abrirModal(){
    const modal = await this.modalCtrl.create(
      {
        component: ModalAccionPage,
        componentProps:{
          
        }
      });
    await modal.present();
    
    const {data} = await modal.onDidDismiss();
  }

  obtenerTitulo($event) {
    this.tituloActividad = $event.target.value;
  }

  salirSinGuardar(){
    this.modalCtrl.dismiss();
  }
  
  guardar(){
    this.modalCtrl.dismiss({
    });
  }
  

}
