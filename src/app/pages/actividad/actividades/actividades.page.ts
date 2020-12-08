import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  actividades: any[] = [];

  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService) {
    // this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria)
    .pipe(
      map( (resp : [] ) => resp.map ( ({actividad, nivel, tipoActividad, contenidoActividad, imagen, detalle}) => ({titulo : actividad, nivel, tipoActividad, contenidoActividad, imagen, detalle})))
    )
    .subscribe( resp => {
      this.actividades = resp;
    });
  }

  obtenerActividad(actividad, tipoActividad, contenidoActividad, imagen, interaccion) {
    actividad = {

      actividad : actividad,
      tipoActividad: tipoActividad,
      contenidoActividad: contenidoActividad,
      imagen: imagen,
      //interaccion: interaccion

    }
    localStorage.setItem('actividad', JSON.stringify(actividad));
    console.log(actividad);

    if(contenidoActividad == "Solo texto"){
      this.router.navigate(['/tablinks/actividad/solo-texto'], contenidoActividad);
      console.log(contenidoActividad);
    }
    else if (contenidoActividad == "Solo imágenes"){
      this.router.navigate(['/tablinks/actividad/solo-texto'], contenidoActividad);
      console.log(contenidoActividad);
    }
    else if (contenidoActividad == "Solo imágenes y texto")
    {
      this.router.navigate(['/tablinks/actividad/solo-texto'], contenidoActividad);
      console.log(contenidoActividad);
    }

    // if(interaccion == "Click, Escuchar"){
    //   this.router.navigate(['/tablinks/actividad/ce-asociar']);
    // }
    // else if (interaccion == "Arrastrar, Click, Escuchar")
    // {
    //   this.router.navigate(['/tablinks/actividad/ace-asociar']);
    // }
    
  }
}
