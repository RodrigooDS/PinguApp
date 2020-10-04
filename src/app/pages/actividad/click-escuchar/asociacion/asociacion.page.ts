import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.page.html',
  styleUrls: ['./asociacion.page.scss'],
})
export class AsociacionPage implements OnInit {

  categoria: string;
  actividad: string;
  interaccion: string
  estado: boolean = false;
  constructor(public tabEstado: TabsService,
              public router: Router,
              private location: Location,
              public upload: UploadService) {

    var test = JSON.parse(localStorage.getItem('actividad'));
    this.actividad = test.actividad;
    this.interaccion = test.interaccion;
    
  }

  ngOnInit() {
    // this.obtenerDatosActividad();
    this.tabEstado.cambiarEstado(true);
  }

  registro(event) {
    if(event){
      this.router.navigate(['/tablinks/actividad/completacion']);
      // this.estado = true;
    }
  }

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.location.back();
  }

}