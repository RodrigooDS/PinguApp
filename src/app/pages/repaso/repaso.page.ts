import { Component, OnInit } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];

  constructor(public upload: UploadService,
              public router: Router) {
    this.obtenerCategorias();
   }

  ngOnInit() {
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
    this.router.navigate(['/tablinks/repaso/actividades',{category: this.tipoCategoria}]);
  }

}
