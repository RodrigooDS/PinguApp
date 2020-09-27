import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {
  
  tituloActividad: string = '';
  tituloCategoria: string = '';
  actividades: any[] = [];
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService) {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  ionViewWillEnter() {
    this.tituloActividad = ''
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  agregar() {
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{tittle: this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase()), category: this.tituloCategoria}],);
  }  

  cancelar() {
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerActividades() {
    this.upload.obtenerActividad(this.tituloCategoria).pipe(
      map( (resp : [] ) => resp.map ( ({actividad}) => ({titulo : actividad})))
    )
    .subscribe( resp => {
      this.actividades =resp;
      // console.log(this.actividades);
    });
  }

  editarActividad(actividad: string) {
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{tittle: actividad.replace(/\b\w/g, l => l.toUpperCase()), category: this.tituloCategoria}],);
  }
}

  

