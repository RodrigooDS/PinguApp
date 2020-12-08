import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.page.html',
  styleUrls: ['./editar-actividad.page.scss'],
})
export class EditarActividadPage implements OnInit {

  tipoCategoria : string;
  categorias : any[] = [];
   
  constructor(public actividadService: ActividadesService,
              public router: Router) { 
    localStorage.clear();
  }

  ngOnInit() {
    this.obtenerCategorias();
    localStorage.clear();
  }

  obtenerCategorias() {
    this.actividadService.obtenerCategorias()
    .subscribe( resp => {
      this.categorias = resp;
    });
  }
  
  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    this.router.navigate(['/tablinks/editar-actividad/actividad',{category: this.tipoCategoria}]);
  }

}
