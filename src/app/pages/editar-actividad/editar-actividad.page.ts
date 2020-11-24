import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Categoria } from '../../shared/categoria.interfaces';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.page.html',
  styleUrls: ['./editar-actividad.page.scss'],
})
export class EditarActividadPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];
   
  constructor(public upload: UploadService, 
              public router: Router) { 
    localStorage.clear();
  }

  ngOnInit() {
    this.obtenerCategorias();
    localStorage.clear();
  }

  obtenerCategorias() {
    this.upload.obtenerCategorias().pipe(
      map( (resp : [] ) => resp.map( ({imageUrl,nombreCategoria}) => ({categoria : nombreCategoria, imagen : imageUrl}) ))
    )
    .subscribe( resp => {
      this.categorias = resp;
    });
  }
  
  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    this.router.navigate(['/tablinks/editar-actividad/actividad',{category: this.tipoCategoria}]);
  }

}
