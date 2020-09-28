import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { map } from 'rxjs/operators';
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
              private route: ActivatedRoute,
              public upload: UploadService) {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.obtenerActividades();
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades() {
    this.upload.obtenerActividad(this.tituloCategoria).pipe(
      map( (resp : [] ) => resp.map ( ({actividad, detalle}) => ({titulo : actividad, detalle})))
    )
    .subscribe( resp => {
      this.actividades =resp;
    });
  }

}
