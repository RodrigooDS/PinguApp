import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad-repaso',
  templateUrl: './actividad-repaso.page.html',
  styleUrls: ['./actividad-repaso.page.scss'],
})
export class ActividadRepasoPage implements OnInit {

  actividad : string;
  categoria: string;

  nivel: string;
  imagen: string;

  constructor(public tabEstado: TabsService,
 public router: Router) {

  var datos = JSON.parse(localStorage.getItem('repaso'));
  this.actividad = datos.actividad;
  this.categoria = datos.categoria;  
}

  ngOnInit() {
    
  }

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/repaso'],{ replaceUrl: true });
  }
}
