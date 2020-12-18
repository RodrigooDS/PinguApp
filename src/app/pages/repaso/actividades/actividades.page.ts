import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepasosService } from '../../../services/repasos.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  repasos: any[] = [];

  constructor(public router: Router, 
              private route: ActivatedRoute,
              public RepasosService: RepasosService,
              ) {
    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
    this.obtenerRepasos();
  }

  ngOnInit() {
    this.obtenerRepasos();
  }

  async obtenerRepasos() {
    this.repasos = await this.RepasosService.obtenerRepasos(this.tituloCategoria);
  }

  obtenerRepaso(actividad: string, categoria: string){
  
    let datos = {
      actividad : actividad,
      categoria: categoria,
    }

    localStorage.setItem('repaso', JSON.stringify(datos));    
    this.router.navigate(['/tablinks/repaso/actividad-repaso']);
  }

}
