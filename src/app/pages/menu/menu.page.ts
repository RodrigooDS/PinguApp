import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../shared/interfaces';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  componentes: Observable<Menu[]>;

  uid: any;
  tipoUsuario: string;

  constructor(private dataService: DataService,
              private alertCtrl: AlertController,
              private authService: AuthService) { 
    this.componentes = this.dataService.getMenuOpts();
    // this.authService.usuario.subscribe(resp => {
    //   this.authService.obtenerUsuario2(resp.uid).pipe(
    //     map( (resp: User) => resp)
    //   )
    //   .subscribe(
    //     resp => {this.uid = resp.uid,this.obtenerTipoUsuario(resp.uid)}
    //   )
    // })
  }

  async ngOnInit() {
    let user = await this.authService.afAuth.currentUser;
    this.obtenerTipoUsuario(user.uid)
  }

  cerrarSesion() {
    this.alertaCerrarSesion();
  }

  async obtenerTipoUsuario(uid: any) {
    this.tipoUsuario = await this.authService.obtenerTipoDeUsuario(uid);
  }

  async alertaCerrarSesion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión',
      mode: "ios",
      message: '¿Estás seguro de que quieres cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Salir',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
