import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../services/estadistica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  alumnos: any;

  constructor(private estadistica: EstadisticaService,
              private router: Router) {
                localStorage.clear();
               }

  ngOnInit() {
    this.obtenerAlumnos();
  }

  async obtenerAlumnos() {
    this.estadistica.obtenerPrecargaUsuariosFiltrados("alumno").subscribe(resp => {this.alumnos = resp,console.log(resp)})
  }

  verEstadistica (uid: string) {
    localStorage.setItem('user',uid);
    this.router.navigate(['/tablinks/estadistica/ver-estadistica']);

  }

}
