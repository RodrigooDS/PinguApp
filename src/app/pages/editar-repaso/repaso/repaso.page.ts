import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service
import { UploadService } from '../../../services/upload.service';
import { TabsService } from '../../../services/tabs.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  @ViewChild('fileUploader') fileUploader:ElementRef;

  filename: string;
  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';
  actividades: any[] = [];
  imageURL: string;
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              public tabEstado: TabsService) {
    this.tabEstado.cambiarEstado(true);
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.imageURL = '';
  }

  ngOnInit() {
    this.obtenerActividades();
    this.imageURL = '';
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

  guardar() {
    var json = {categoria    : this.tituloCategoria,
                actividad    : this.tituloActividad,
                imagen       : this.imageURL,
                nombreImagen : this.filename,
                nivel        : this.nivel
    }
    localStorage.setItem('repaso',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.fileUploader.nativeElement.value = null;
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerActividades() {
    this.upload.obtenerRepasos(this.tituloCategoria).pipe(
      map( (resp : [] ) => resp.map ( ({actividad,categoria,detalle, nivel}) => ({actividad : actividad, categoria : categoria, imagen : detalle, nivel})))
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
    this.upload.eliminarTodoRepaso(actividad);    
  }
}

  

