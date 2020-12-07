import { Component, OnInit } from '@angular/core';
// import { UploadService } from '../../services/upload.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

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
    localStorage.setItem('categoria', JSON.stringify(this.tipoCategoria));
    this.router.navigate(['/tablinks/actividad/actividades']);
  }

}
