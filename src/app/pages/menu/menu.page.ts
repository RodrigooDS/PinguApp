import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../shared/interfaces';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  componentes: Observable<Menu[]>;

  constructor(private dataService: DataService,
              private alertCtrl: AlertController,
              private authService: AuthService) { 
    this.componentes = this.dataService.getMenuOpts();
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.alertaCerrarSesion();
  }

  async alertaCerrarSesion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión',
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
