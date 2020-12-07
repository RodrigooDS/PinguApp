import { Component, OnInit } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ObtenerActivadesService } from '../../services/obtener-activades.service';
import { ActividadesService } from '../../services/actividades.service';



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
              public router: Router) {
    this.obtenerCategorias();
   }

  ngOnInit() {
  }

  vistaCategoria(ev: any) {
    this.vistaCategorias = ev.detail.value;
  }

  obtenerCategorias() {
    this.actividadService.obtenerCategorias().pipe()
    .subscribe( resp => {
      this.categorias = resp;
    });
  }

  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    this.router.navigate(['/tablinks/repaso/actividades',{category: this.tipoCategoria}]);
  }

}
