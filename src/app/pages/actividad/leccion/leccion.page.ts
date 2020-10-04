import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.page.html',
  styleUrls: ['./leccion.page.scss'],
})
export class LeccionPage implements OnInit {

  categoria: string;
  actividad: string;
  interaccion: string

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

  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.location.back();
    
  }
}
