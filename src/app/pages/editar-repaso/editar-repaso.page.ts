import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

//interfaces
import { Categoria } from '../../shared/categoria.interfaces';
//service
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-editar-repaso',
  templateUrl: './editar-repaso.page.html',
  styleUrls: ['./editar-repaso.page.scss'],
})
export class EditarRepasoPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];
   
  constructor(public upload: UploadService, public router: Router) { 
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
    this.router.navigate(['/tablinks/editar-repaso/repaso',{category: this.tipoCategoria}]);
  }
}
