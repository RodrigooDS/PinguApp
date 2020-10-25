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

  ngOnInit() {
    console.log('Categoria ',this.tipoCategoria);
    console.log('Repaso ',this.tituloActividad);
  }

  async abrirModal(){
    const modal = await this.modalCtrl.create(
      {
        component: ModalAccionPage,
        componentProps:{
          
        }
      });
    await modal.present();
    
    const {data} = await modal.onDidDismiss();

    console.log(data);
  }

  obtenerTitulo($event) {
    this.tituloActividad = $event.target.value;
    console.log(this.tituloActividad) ;
  }

  salirSinGuardar(){
    this.modalCtrl.dismiss();
  }
  
  guardar(){
    console.log(this.tituloActividad) ;
    // this.authService.crearRepaso(this.tipoCategoria,this.tituloActividad)
    this.modalCtrl.dismiss({
    });
  }
  

}
