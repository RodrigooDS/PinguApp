import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalRepasoPage } from '../modals-repaso/modal-repaso/modal-repaso.page';
import { AuthService } from '../../services/auth.service';
import { Categoria } from '../../shared/categoria.interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editar-repaso',
  templateUrl: './editar-repaso.page.html',
  styleUrls: ['./editar-repaso.page.scss'],
})
export class EditarRepasoPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];

  constructor(public modalCtrl: ModalController,
              public authService: AuthService) { }

  ngOnInit() {
    this.obtenerCategoria();
  }

  async abrirModal(){
    const modal = await this.modalCtrl.create(
      {
        component: ModalRepasoPage,
        componentProps:{
          tipoCategoria: this.tipoCategoria
          // nombre: 'Rodrigo',
          // pais: 'Chile'
        }
      });
    await modal.present();
    const {data} = await modal.onDidDismiss();

    console.log(data);
  }

  obtenerCategoria (){ 
    
    this.authService.obtenerCategorias().pipe(
      map( (resp: Categoria[]) => resp.map(({nombreCategoria}) => ({categoria: nombreCategoria})))
    )
    .subscribe( resp =>{
      this.categorias = resp
    });
  }    
  
}
