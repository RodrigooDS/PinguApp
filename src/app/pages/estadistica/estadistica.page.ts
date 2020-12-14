import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  vistaCategorias: string = "Alumnos";

  alumnos: any;

  constructor(private estadistica: EstadisticaService) { }

  ngOnInit() {
    this.obtenerAlumnos();
  }

  vistaCategoria(ev: any) {
    this.vistaCategorias = ev.detail.value;
  }

  async obtenerAlumnos() {
    this.estadistica.obtenerPrecargaUsuariosFiltrados("alumno").subscribe(resp => {this.alumnos = resp,console.log(resp)})
  }

}
