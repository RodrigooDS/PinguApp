import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../shared/user.interface';

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

  constructor(public router: Router,
              public authService: AuthService) {
    this.obtenerProfesor()
  }

  async ngOnInit() {
    let user = await this.authService.afAuth.currentUser
    await this.obtenerTipoUsuario(user.uid);
  }

  nuevoProfesor() {
    this.router.navigate(['/tablinks/profesor/agregar-profesor']);
  }

  async obtenerTipoUsuario(uid: any) {
    this.tipoUsuario = await this.authService.obtenerTipoDeUsuario(uid);
  }

  async obtenerProfesor() {
    await this.authService.obtenerPrecargaUsuariosFiltrados("profesor").subscribe(resp => {this.profesorPrecarga = resp;});
  }

  async eliminarProfesor(item: any) {
    this.authService.eliminarTodoUsuario(item);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
