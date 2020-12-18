import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.page.html',
  styleUrls: ['./agregar-profesor.page.scss'],
})
export class AgregarProfesorPage implements OnInit {

  colegioData: any [] = [];

  constructor(private auth: AuthService,
              private router: Router,
              public alertController: AlertController) { }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    this.colegioData = await this.auth.obtenerColegio(user.uid);
  }

  async agregarNuevoProfesor( event ){
    let data : any;
    let nombreCompleto: string;
    data = await this.auth.obtenerPrecargaUsuariosPorRut(event.rut);

    if(data){
      this.errorCreacionAlerta();
    }else{
      this.capitalizeNombreApellido(event);
      nombreCompleto = this.nombreCompleto(event);
      this.auth.precargarProfesor(event,nombreCompleto,this.colegioData);
      this.creacionCorrectaAlerta();
      this.router.navigate(['/tablinks/profesor']);
    }
  }

  capitalizeNombreApellido (event){
    event.nombre = event.nombre[0].toUpperCase() + event.nombre.substr(1).toLowerCase();
    event.apellidoPaterno = event.apellidoPaterno[0].toUpperCase() + event.apellidoPaterno.substr(1).toLowerCase();
    event.apellidoMaterno = event.apellidoMaterno[0].toUpperCase() + event.apellidoMaterno.substr(1).toLowerCase();
  }

  nombreCompleto(event) {
    let nombre : string;
    let apellidoPaterno : string;
    let apellidoMaterno : string;
    let nombreCompleto: string;

    nombre = event.nombre;
    apellidoPaterno = event.apellidoPaterno;
    apellidoMaterno = event.apellidoMaterno;

    nombreCompleto = nombre + " " + apellidoPaterno + " " + apellidoMaterno + " ";

    return nombreCompleto;
  }

  async errorCreacionAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Ya existe este profesor.',
      buttons: ['Salir']
    });

    await alert.present();
  }

  async creacionCorrectaAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Correcto',
      mode: 'ios',
      backdropDismiss: false,
      message: 'El profesor fue cargado correctamente.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }

}
