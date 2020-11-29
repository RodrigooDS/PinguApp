import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  alumnos: any;

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
    await this.auth.obtenerPrecargaAlumnos().subscribe(resp => {this.alumnos = resp;
    });

  }

}
