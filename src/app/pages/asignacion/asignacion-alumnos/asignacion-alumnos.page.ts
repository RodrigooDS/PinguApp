import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionActividadesService } from '../../../services/asignacion-actividades.service';

@Component({
  selector: 'app-asignacion-alumnos',
  templateUrl: './asignacion-alumnos.page.html',
  styleUrls: ['./asignacion-alumnos.page.scss'],
})
export class AsignacionAlumnosPage implements OnInit {

  actividad: any;
  alumnos: any[] = [];

  constructor(public router: Router,
              public asignacionService: AsignacionActividadesService) { 
    this.actividad = JSON.parse(localStorage.getItem('actividad'))
  }

  ngOnInit() {
    this.asignacionService.obtenerAlumnosAsignados(this.actividad).subscribe(resp => this.alumnos = resp);
  }

  nuevoAlumno() {
    this.router.navigate(['/tablinks/asignacion/asignacion-agregar-alumno']);
  }

  eliminarAlumno(alumno: any) {
    this.asignacionService.eliminarAlumnoAsignado(this.actividad,alumno);
  }

}
