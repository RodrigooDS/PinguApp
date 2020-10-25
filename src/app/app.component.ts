import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { Menu } from './shared/interfaces';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // componentes: Observable<Menu[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private dataService: DataService,
    // private authService: AuthService,
    // private alertCtrl: AlertController,
    public tabEstado: TabsService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.componentes = this.dataService.getMenuOpts();
    });
  }

  // cerrarSesion() {
  //   this.alertaCerrarSesion();
  // }

  // activarTabs() {
  //   this.tabEstado.cambiarEstado(false);
  // }

  // async alertaCerrarSesion() {
  //   const alert = await this.alertCtrl.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Cerrar sesión',
  //     message: '¿Estás seguro de que quieres cerrar la sesión?',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //         }
  //       }, {
  //         text: 'Salir',
  //         handler: () => {
  //           this.authService.logout();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
}
