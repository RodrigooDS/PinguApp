import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  tipoPregunta: string = '';
  actividades: any[] = [];

  constructor(public router: Router,
              private actividadesService: ObtenerActivadesService
  ) {

    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
  
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  async obtenerActividades() {
    this.actividades =  await this.actividadesService.obtenerActividades(this.tituloCategoria);
  }

  obtenerActividad(actividad: string, contenidoActividad: string, tipoPregunta: string, imagen: string) {

    let datos = {
      actividad : actividad,
      interaccion: contenidoActividad,
      tipoPregunta: tipoPregunta,
      imagen: imagen
    }
    localStorage.setItem('actividad', JSON.stringify(datos));

    if(contenidoActividad == "Solo texto" || contenidoActividad == "Solo imágenes" || contenidoActividad == "Solo imágenes y texto"){
      this.router.navigate(['/tablinks/actividad/desarrollo-actividad']);
    } 
       
  }
}
