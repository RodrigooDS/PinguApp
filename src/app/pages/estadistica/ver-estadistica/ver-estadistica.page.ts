import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-ver-estadistica',
  templateUrl: './ver-estadistica.page.html',
  styleUrls: ['./ver-estadistica.page.scss'],
})
export class VerEstadisticaPage implements OnInit {

  uid: string;
  data: any[] = [];

  constructor(private estadistica: EstadisticaService) { }

  async ngOnInit() {
    let uid = await localStorage.getItem('user');
    await this.obtenerActividades(uid);
    console.log(uid);
  }

  obtenerActividades (uid: string) {
    this.estadistica.obtenerEstadisticaPorActividad("UXMRG6Mm2OXeqLkpGyfP60uVa3E2").subscribe(resp => console.log(resp))
  }

}
