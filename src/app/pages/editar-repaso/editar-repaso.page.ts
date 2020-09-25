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
  tituloActividad: string;
  
  categorias : any[] = [];
  ocultar: string = "0";

    
  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.obtenerCategoria();
  }

  obtenerCategoria (){ 
    
    this.authService.obtenerCategorias().pipe(
      map( (resp: Categoria[]) => resp.map(({nombreCategoria}) => ({categoria: nombreCategoria})))
    )
    .subscribe( resp =>{
      this.categorias = resp
    });
  } 
  
  cambiarEstado(tipoBoolean: string){
    this.ocultar = tipoBoolean;
    console.log(this.ocultar)
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    console.log(this.tituloActividad) ;
  }

  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    console.log(this.tipoCategoria)
  }
  
  cancelar(){
    this.ocultar  = '0';
  }

  guardar(){
    this.ocultar  = '0';
  }
  // agregarActividad(estado: s){
  //   this.cambiarEstado(estado);
  // }
}
