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

  constructor(public router: Router,
              public authService: AuthService) {
    this.obtenerProfesor()
    this.authService.usuario.subscribe(resp => {
    this.authService.obtenerUsuario(resp.uid).pipe(map( (resp: User) => resp)).subscribe(
      resp => {this.uid = resp.uid,this.obtenerTipoUsuario(resp.uid)}
    )
    })
  }

  ngOnInit() {
  }

  nuevoProfesor() {
    this.router.navigate(['/tablinks/profesor/agregar-profesor']);
  }

  async obtenerTipoUsuario(uid: any) {
    this.tipoUsuario = await this.authService.obtenerTipoDeUsuario(uid);
  }

  async obtenerProfesor() {
    await this.authService.obtenerPrecargaUsuariosFiltrados("profesor").subscribe(resp => {this.profesorPrecarga = resp; console.log(resp)});
  }

  async eliminarProfesor(item: any) {
    this.authService.eliminarTodoUsuario(item);
  }

}
