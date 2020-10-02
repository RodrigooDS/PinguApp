import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  // data: any = [];
  // fileImage: any;
  filename: string;
  // item: {};

  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';
  interaccion : string = '';
  actividades: any[] = [];
  imageURL: string;
  
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
    this.imageURL = '';
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  obtenerNivel(nivel) {
    this.nivel = nivel;
  }

  obtenerInteraccion(interaccion) {
    this.interaccion = interaccion;
  }

  guardar() {
    var json = {categoria    : this.tituloCategoria,
                actividad    : this.tituloActividad,
                imagen       : this.imageURL,
                nombreImagen : this.filename,
                nivel        : this.nivel,
                interaccion  : this.interaccion
    }
    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }  

  cancelar() {
    this.router.navigate(['/tablinks/editar-actividad']);
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria)
    .subscribe( resp => {
      this.actividades = resp;
    });

  }

  editarActividad(imagen: string, actividad: string) {
    
    var json = {
      categoria    : this.tituloCategoria,
      actividad    : actividad,
      imagen       : imagen
  	}
    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }

  cargarArchivo(event) {
    
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  eliminarActividad(actividad) {
    this.upload.eliminarTodoActividad(actividad);    
  }

}
