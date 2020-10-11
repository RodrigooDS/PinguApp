import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../../services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ce-completar',
  templateUrl: './ce-completar.page.html',
  styleUrls: ['./ce-completar.page.scss'],
})
export class CeCompletarPage implements OnInit {

  constructor(public tabEstado: TabsService,
              public router: Router) { }

  ngOnInit() {
  }

  cancelar() {
  this.tabEstado.cambiarEstado(false);
  // this.location.back();
  this.router.navigate(['/tablinks/actividad']);
  }

  guardar() {
  this.tabEstado.cambiarEstado(false);
  // this.location.back();
  this.router.navigate(['/tablinks/actividad']);
  localStorage.clear();
  }

}
