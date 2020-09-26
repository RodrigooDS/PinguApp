import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  tituloActividad: string;
  tituloCategoria: string;

  // @Output() actividad = new EventEmitter<string>();
  
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    // console.log(this.tituloActividad) ;
  }

  agregar(){
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    console.log('estamos aca ->',this.tituloCategoria);
    // this.actividad.emit(this.tituloActividad);
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{tittle: this.tituloActividad, category: this.tituloCategoria}],);
  }  
  cancelar(){
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  
}
