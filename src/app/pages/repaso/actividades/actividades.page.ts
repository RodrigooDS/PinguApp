import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  actividades: any[] = [];

  constructor(public router: Router, 
              private route: ActivatedRoute) {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.obtenerActividades();
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades() {
    
  }

}
