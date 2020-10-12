import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ce-completar',
  templateUrl: './ce-completar.page.html',
  styleUrls: ['./ce-completar.page.scss'],
})
export class CeCompletarPage implements OnInit {

  constructor(public tabEstado: TabsService,
              public router: Router,
              private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  cancelar() {
    this.menuCtrl.enable(true);
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad']);
  }

  guardar() {
    this.menuCtrl.enable(true);
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad']);
    localStorage.clear();
  }

}
