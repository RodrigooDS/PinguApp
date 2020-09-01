import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AlertController } from '@ionic/angular';

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
  
  public user : User;

  constructor(public alertController: AlertController,
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit() {
  }

  async registrarCuenta(){
    try {
      var nombreAlumno = this.juntarNombre(this.usuarioRegistro.nombreApoderado, this.usuarioRegistro.apellidoApoderado);
      var nombreApoderado = this.juntarNombre(this.usuarioRegistro.nombreApoderado, this.usuarioRegistro.apellidoApoderado)
      const user = await this.authService.register(this.usuarioRegistro.email, this.usuarioRegistro.password, nombreAlumno, nombreApoderado);
      if (user) {
        this.router.navigate(['/tablinks']);
        console.log(user);
      }else{
        this.alertaCuenta();
        //this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async alertaCuenta() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      //subHeader: 'Subtitle',
      message: 'Este correo ya fue registrado',
      //buttons: ['Salir']
      buttons: [
        {
          text: "Salir",
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    
    await alert.present();
    
  }


  // private checkUserIsVerified(user: User) {
  //   if (user) {
  //     this.router.navigate(['/tablinks']);
  //   } else {
  //     this.router.navigate(['/register']);
  //   }
  // }

  juntarNombre(nombre: string, apellido: string){
    
    const espacio = " ";
    var nombreCompleto =  nombre.concat(espacio.toString());
    nombreCompleto = nombreCompleto.concat(apellido.toString());
    return nombreCompleto;
  }

}
