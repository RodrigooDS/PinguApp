import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { map } from 'rxjs/operators';

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
              private route: ActivatedRoute,
              public upload: UploadService) {
    // this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria)
    .pipe(
      map( (resp : [] ) => resp.map ( ({actividad, nivel, interaccion, detalle}) => ({titulo : actividad, nivel, interaccion, detalle})))
    )
    .subscribe( resp => {
      this.actividades = resp;
      console.log(resp);
    });
  }

  obtenerActividad(actividad, interaccion) {
    actividad = {
      actividad : actividad,
      interaccion: interaccion
    }
    // this.tituloActividad = actividad
    localStorage.setItem('actividad', JSON.stringify(actividad));
    this.router.navigate(['/tablinks/actividad/leccion']);
  }
}
