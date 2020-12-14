import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-ver-estadistica',
  templateUrl: './ver-estadistica.page.html',
  styleUrls: ['./ver-estadistica.page.scss'],
})
export class VerEstadisticaPage implements OnInit {

  uid: string;
  actividades: any[] = [];
  estadistica: any[] = [];

  constructor(private estadisticaService: EstadisticaService) { }

  async ngOnInit() {
    this.uid = await localStorage.getItem('user');
    await this.obtenerActividades(this.uid);
  }

  obtenerActividades (uid: string) {
    this.estadisticaService.obtenerActividades("UXMRG6Mm2OXeqLkpGyfP60uVa3E2").subscribe(resp => {this.actividades = resp,console.log(resp)})
  }

  async verEstadistica(actividad: string) {
    this.estadistica = await this.estadisticaService.obtenerEstadisticaPorActividad(actividad, "UXMRG6Mm2OXeqLkpGyfP60uVa3E2");
    console.log(this.estadistica)
  }

}
