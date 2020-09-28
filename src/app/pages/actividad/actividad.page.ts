import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  categorias: any[] = [];

  constructor( public upload: UploadService) {
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
      console.log(resp);
    });
  }

}
