import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-repaso',
  templateUrl: './agregar-repaso.page.html',
  styleUrls: ['./agregar-repaso.page.scss'],
})
export class AgregarRepasoPage implements OnInit {

  tituloActividad: string;
  tituloCategoria: string;

  constructor(public router: Router, private route: ActivatedRoute) { 
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');
  }

  ngOnInit() {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');
  }

  guardar(){
    this.router.navigate(['/tablinks/editar-repaso']);
  }  

  cancelar(){
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  agregarImagen(){
    this.router.navigate(['/tablinks/editar-repaso/cargar-repaso']);
  }

}
