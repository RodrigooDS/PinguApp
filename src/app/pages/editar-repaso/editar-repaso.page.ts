import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-editar-repaso',
  templateUrl: './editar-repaso.page.html',
  styleUrls: ['./editar-repaso.page.scss'],
})
export class EditarRepasoPage implements OnInit {

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
    this.router.navigate(['/tablinks/editar-repaso/repaso',{category: this.tipoCategoria}]);
  }
}
