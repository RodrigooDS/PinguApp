import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service
import { UploadService } from '../../../services/upload.service';
import { Actividad } from '../../../shared/actividad.interfaces';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  data: any = [];
  fileImage: any;
  filename: string;
  item: {};

  tituloActividad: string = '';
  tituloCategoria: string = '';
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

  guardar() {
    var json = {categoria    : this.tituloCategoria,
                actividad    : this.tituloActividad,
                imagen       : this.imageURL,
                nombreImagen : this.filename
    }
    localStorage.setItem('repaso',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }  

  cancelar() {
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria).pipe(
      map( (resp : [] ) => resp.map ( ({actividad,categoria,detalle}) => ({actividad : actividad, categoria : categoria, imagen : detalle})))
    )
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
    localStorage.setItem('repaso',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
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
    this.upload.eliminarTodo(actividad);    
  }
}

  

