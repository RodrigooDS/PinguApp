import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';
import { RepasosService } from '../../services/repasos.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];
  vistaCategorias: string = "tarjetas";

  constructor(public actividadService: ActividadesService,
              public router: Router,
              public repasos: RepasosService) {
    this.obtenerCategorias();
   }

  ngOnInit() {
  }

  vistaCategoria(ev: any) {
    this.vistaCategorias = ev.detail.value;
  }

  obtenerCategorias() {
    this.repasos.obtenerCategorias().pipe()
    .subscribe( resp => {
      this.categorias = resp;
    });
  }

  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria;
    localStorage.setItem('categoria', JSON.stringify(this.tipoCategoria));
    this.router.navigate(['/tablinks/repaso/actividades']);
  }

}
