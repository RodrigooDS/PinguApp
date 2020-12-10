import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { TabsService } from '../../../services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-actividad',
  templateUrl: './fin-actividad.page.html',
  styleUrls: ['./fin-actividad.page.scss'],
})
export class FinActividadPage implements OnInit {

  constructor(private modalCtrl: ModalController, 
    public tabEstado: TabsService,
    public router: Router,
    private menuCtrl: MenuController,) { }

  ngOnInit() {
  }

  menuPrincipal(){

    this.modalCtrl.dismiss();
    this.menuCtrl.enable(true);
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad'],{ replaceUrl: true });
    
  }

  reintentar(){
    // location.replace(('/tablinks/actividad/ce-asociar'));
    this.modalCtrl.dismiss();
    this.menuCtrl.enable(false);
    this.tabEstado.cambiarEstado(false);
    setTimeout(() => {
      location.replace(('/tablinks/actividad/desarrollo-actividad'));
    }, 1);
  }

}
