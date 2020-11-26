import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UploadService } from '../../../../services/upload.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ce-asociar',
  templateUrl: './ce-asociar.page.html',
  styleUrls: ['./ce-asociar.page.scss'],
})
export class CeAsociarPage implements OnInit {

  categoria: string;
  actividad: string;
  interaccion: string
  estado: boolean = false;
  
  constructor(public tabEstado: TabsService,
              public router: Router,
              public upload: UploadService) {
    this.tabEstado.cambiarEstado(true);
    var datos = JSON.parse(localStorage.getItem('actividad'));
    this.categoria = JSON.parse(localStorage.getItem('categoria'));
    this.actividad = datos.actividad;
    this.interaccion = datos.interaccion;
  }

  ngOnInit() {
    
  }

  registro(event) {
    if(event){
      this.router.navigate(['/tablinks/actividad/ce-completar']),{ replaceUrl: true };
    }
  }

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad'], { replaceUrl: true });
  }
}
