import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuarioRegistro = {
      email: '',
      nombreEstudiante: '',
      apellidoEstudiante: '',
      nombreApoderado: '',
      apellidoApoderado: '',
      password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async registrarCuenta(){
    try {
      var nombreAlumno = this.juntarNombre(this.usuarioRegistro.nombreApoderado,this.usuarioRegistro.apellidoApoderado);
      var nombreApoderado = this.juntarNombre(this.usuarioRegistro.nombreApoderado,this.usuarioRegistro.apellidoApoderado)
      const user = await this.authService.register(this.usuarioRegistro.email, this.usuarioRegistro.password, nombreAlumno, nombreApoderado);
      if (user) {
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user) {
      this.router.navigate(['/tablinks']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  juntarNombre(nombre: string, apellido: string){
    
    const espacio = " ";
    var nombreCompleto =  nombre.toUpperCase().concat(espacio.toString());
    nombreCompleto = nombreCompleto.concat(apellido.toUpperCase().toString());
    return nombreCompleto;
  }

}
