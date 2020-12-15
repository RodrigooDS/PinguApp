import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-estadistica',
  templateUrl: './ver-estadistica.page.html',
  styleUrls: ['./ver-estadistica.page.scss'],
})
export class VerEstadisticaPage implements OnInit {

  uid: string;
  actividades: any[] = [];

  constructor(private estadisticaService: EstadisticaService,
              private router: Router) { }

  async ngOnInit() {
    this.uid = await localStorage.getItem('user');
    await this.obtenerActividades(this.uid);
  }

  obtenerActividades (uid: string) {
    this.estadisticaService.obtenerActividades(uid).subscribe(resp => {this.actividades = resp,console.log(resp)})
  }

  async verEstadistica(actividad: string) {
    localStorage.setItem('actividad',actividad)
    this.router.navigate(['/tablinks/estadistica/detalle-estadistica']);
  }

}
