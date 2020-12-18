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
  textoBuscar: string = '';
  colegioData: any [] = [];

  constructor(public router: Router,
              public auth: AuthService) { 
                
  }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    this.colegioData = await this.auth.obtenerColegio(user.uid);
    this.obtenerAlumnos();
  }

  nuevoAlumno() {
    this.router.navigate(['/tablinks/alumnos/agregar-alumno']);
  }

  async obtenerAlumnos() {
    this.auth.obtenerPrecargaUsuariosPorUsuario("alumno",this.colegioData).subscribe(resp => {this.alumnosPrecarga = resp;});
  }

  async eliminarAlumno(item: any) {
    this.auth.eliminarTodoUsuario(item);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
