import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

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
    localStorage.setItem('categoria', JSON.stringify(this.tipoCategoria));
    this.router.navigate(['/tablinks/actividad/actividades']);
  }

}
