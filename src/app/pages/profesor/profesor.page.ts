import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  profesorPrecarga: any;
  tipoUsuario: string;
  uid: any;
  textoBuscar: string = '';
  colegioData: any [] = [];

  constructor(public router: Router,
              public auth: AuthService) { }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    this.colegioData = await this.auth.obtenerColegio(user.uid);
    await this.obtenerProfesor()
  }

  nuevoProfesor() {
    this.router.navigate(['/tablinks/profesor/agregar-profesor']);
  }

  obtenerProfesor() {
    this.auth.obtenerPrecargaUsuariosPorUsuario("profesor",this.colegioData).subscribe(resp => {this.profesorPrecarga = resp;});
  }

  async eliminarProfesor(item: any) {
    this.auth.eliminarTodoUsuario(item);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
