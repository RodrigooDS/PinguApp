import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';
// import { UploadService } from '../../../../services/upload.service';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ace-asociar',
  templateUrl: './ace-asociar.page.html',
  styleUrls: ['./ace-asociar.page.scss'],
})
export class AceAsociarPage implements OnInit {

  categoria: string;
  actividad: string;
  interaccion: string
  estado: boolean = false;

  constructor(public tabEstado: TabsService,
              public router: Router,
              private location: Location,
              // public upload: UploadService,
              private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
    this.tabEstado.cambiarEstado(true);
    var datos = JSON.parse(localStorage.getItem('actividad'));
    this.actividad = datos.actividad;
    this.interaccion = datos.interaccion;
  }

  ngOnInit() {
  }

  cancelar() {
    localStorage.clear();
    this.menuCtrl.enable(true);
    this.tabEstado.cambiarEstado(false);
    this.location.back();
  }
}
