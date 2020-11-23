import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { TabsService } from '../../../services/tabs.service';
import { PhotoCameraService } from 'src/app/services/photo-camera.service';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  @ViewChild('fileUploader') fileUploader:ElementRef;

  imageFile: File;
  imageCamera: any;
  imageUrl: string;
 
  filename: string;
  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';
  interaccion : string = '';
  actividades: any[] = [];
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              public tabEstado: TabsService,
              public photoService: PhotoCameraService) {
    this.tabEstado.cambiarEstado(true);
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.imageUrl = '';
  }

  ngOnInit() {
    this.obtenerActividades();
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
                imagen       : this.imageCamera.dataUrl,
                nombreImagen : this.filename,
                nivel        : this.nivel,
                interaccion  : this.interaccion
    }
    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.fileUploader.nativeElement.value = null;
    this.router.navigate(['/tablinks/editar-actividad']);
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria)
    .subscribe( resp => {
      this.actividades = resp;
    });

  }

  editarActividad(imagen: string, actividad: string, nivel: string) {
    var json = {
      categoria    : this.tituloCategoria,
      actividad    : actividad,
      imagen       : imagen,
      nivel        : nivel
  	}
    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }

  cargarArchivo(event) {
    
    try {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      
    }
    
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    console.log(this.imageCamera);
  }

  eliminarActividad(actividad) {
    this.upload.eliminarTodoActividad(actividad);    
  }

}
