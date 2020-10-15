import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, MenuController, NavController } from '@ionic/angular';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ce-estadistica',
  templateUrl: './ce-estadistica.page.html',
  styleUrls: ['./ce-estadistica.page.scss'],
})
export class CeEstadisticaPage implements OnInit {

  
  @Input() buena;
  @Input() parcial;
  @Input() error;
  @Input() errores;

  constructor(private modalCtrl: ModalController, 
              private navParams:NavParams,
              public tabEstado: TabsService,
              public router: Router,
              private menuCtrl: MenuController,
              private navCtrl: NavController) { }

  ngOnInit() {
    
    this.buena = this.navParams.get('buena');
    this.parcial = this.navParams.get('parcial');
    this.error = this.navParams.get('error');
    this.errores = this.navParams.get('errores');

  }

  menuPrincipal(){

    this.modalCtrl.dismiss();
    this.menuCtrl.enable(true);
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad']);
    
  }

  reintentar(){

    this.modalCtrl.dismiss();
    this.menuCtrl.enable(false);
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad/ce-asociar']);
  }



}
