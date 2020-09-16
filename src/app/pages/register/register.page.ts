import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  formRegistro : any  = '' 

  constructor(private alertController: AlertController, 
              private auth: AuthService, 
              private router: Router) {}
         
  ngOnInit() {}
 
  async registro(_event) {

    this.formRegistro = _event;
    // console.log(this.formRegistro);
    try {
      const user = await this.auth.register(this.formRegistro.email, this.formRegistro.password, this.formRegistro);
      if (user) {
        // const isVerified = this.auth.isEmailVerified(user);
        // this.redirectUser(isVerified);
        this.router.navigate(['/tablinks']);
      }else{
        this.alertaCuenta();
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  async alertaCuenta() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al registrarse',
      //subHeader: 'Subtitle',
      message: 'Este correo ya fue registrado',
      //buttons: ['Salir']
      buttons: [
        {
          text: "Salir",
          handler: () => {
            //this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();

  }
  
}
