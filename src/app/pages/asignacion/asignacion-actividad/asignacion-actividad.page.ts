import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';

@Component({
  selector: 'app-asignacion-actividad',
  templateUrl: './asignacion-actividad.page.html',
  styleUrls: ['./asignacion-actividad.page.scss'],
})
export class AsignacionActividadPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  tipoPregunta: string = '';
  actividades: any[] = [];
  vistaCategorias: string = "1";

  constructor(public router: Router,
              private actividadesService: ObtenerActivadesService) {
    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  async obtenerActividades() {
    this.actividades =  await this.actividadesService.obtenerActividades(this.tituloCategoria);
    console.log(this.actividades);
  }

  obtenerActividad(actividad: string, categoria:string,contenidoActividad: string, tipoPregunta: string, imagen: string, nivel:string) {

    let datos = {
      actividad : actividad,
      categoria: categoria,
      interaccion: contenidoActividad,
      tipoPregunta: tipoPregunta,
      imagen: imagen,
      nivel: nivel
    }

    localStorage.setItem('actividad', JSON.stringify(datos));

    this.router.navigate(['/tablinks/asignacion/asignacion-alumnos']);
  }

  vistaCategoria(ev: any) {
    this.vistaCategorias = ev.detail.value;
  }

}
