import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.page.html',
  styleUrls: ['./asignacion.page.scss'],
})
export class AsignacionPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];

  constructor(public actividadService: ActividadesService,
              public router: Router) {
    this.obtenerCategorias();
  }

  ngOnInit() {
  }

  obtenerCategorias() {
    this.actividadService.obtenerCategorias().pipe()
    .subscribe( resp => {
      this.categorias = resp;
    });
  }

  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    localStorage.setItem('categoria', JSON.stringify(this.tipoCategoria));
    this.router.navigate(['/tablinks/asignacion/asignacion-actividad']);
  }
}
