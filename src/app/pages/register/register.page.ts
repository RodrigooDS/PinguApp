import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  
  constructor(private auth: AuthService, 
              private router: Router,
              public alertController: AlertController) {}
         
  ngOnInit() {}
 
  async registro(event) {
    let data : any;
    data = await this.auth.obtenerPrecargaUsuariosPorRut(event.rut);

    if(data){
      this.crearCuenta(event);
    }else{
      this.errorAlumnoNoAutorizadoAlerta();
    }

  }

  async crearCuenta(event) {
    try {
      const user = await this.auth.register(event.email, event.password, event);
      if (user) {
        // const isVerified = this.auth.isEmailVerified(user);
        // this.redirectUser(isVerified);
        this.router.navigate(['/tablinks']);
      }else{
        this.errorCreacionAlerta();
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  async errorCreacionAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Ya existe este alumno.',
      buttons: ['Salir']
    });

    await alert.present();
  }

  async errorAlumnoNoAutorizadoAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Este alumno no está autorizado para hacer uso de esta aplicación.',
      buttons: ['Salir']
    });

    await alert.present();
  }

}
