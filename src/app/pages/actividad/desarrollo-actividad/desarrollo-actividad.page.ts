import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desarrollo-actividad',
  templateUrl: './desarrollo-actividad.page.html',
  styleUrls: ['./desarrollo-actividad.page.scss'],
})
export class DesarrolloActividadPage implements OnInit {

  categoria: string;
  actividad: string;
  contenido: string;

  constructor(public tabEstado: TabsService,
    public router: Router) {

    var datos = JSON.parse(localStorage.getItem('actividad'));
    this.categoria = JSON.parse(localStorage.getItem('categoria'));
    this.actividad = datos.actividad;
    this.contenido = datos.interaccion;
    
   }

  ngOnInit() {
    console.log(this.contenido);
  }

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/actividad'],{ replaceUrl: true });
  }

}
