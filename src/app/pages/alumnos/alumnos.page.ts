import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  alumnosPrecarga: any;

  constructor(public router: Router,
              public auth: AuthService) { 
                this.obtenerAlumnos();
  }

  ngOnInit() {
  }

  nuevoAlumno() {
    this.router.navigate(['/tablinks/alumnos/agregar-alumno']);
  }

  async obtenerAlumnos() {
    await this.auth.obtenerPrecargaUsuariosFiltrados("alumno").subscribe(resp => {this.alumnosPrecarga = resp; console.log(resp)});
  }

  async eliminarAlumno(item: any) {
    this.auth.eliminarTodoUsuario(item);
  }

}
