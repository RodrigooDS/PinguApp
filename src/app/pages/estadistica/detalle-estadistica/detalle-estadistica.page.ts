import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-detalle-estadistica',
  templateUrl: './detalle-estadistica.page.html',
  styleUrls: ['./detalle-estadistica.page.scss'],
})
export class DetalleEstadisticaPage implements OnInit {

  uid: string;
  actividad: string;
  estadistica: any[] = [];

  constructor(private estadisticaService: EstadisticaService) { }

  async ngOnInit() {
    this.uid = await localStorage.getItem('uid');
    this.actividad = await localStorage.getItem('actividad');
    await this.obtenerEstadistica();
  }

  async obtenerEstadistica() {
    this.estadistica = await this.estadisticaService.obtenerEstadisticaPorActividad(this.actividad, "UXMRG6Mm2OXeqLkpGyfP60uVa3E2");
    console.log(this.estadistica)
  }

}
