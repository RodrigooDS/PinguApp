import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service
import { UploadService } from '../../../services/upload.service';
import { TabsService } from '../../../services/tabs.service';
import { PhotoCameraService } from '../../../services/photo-camera.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  @ViewChild('fileUploader') fileUploader:ElementRef;

  imageFile: File;
  imageCamera: any;
  imageUrl: string;

  filename: string;
  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';
  actividades: any[] = [];
  imageURL: string;
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              public tabEstado: TabsService,
              public photoService: PhotoCameraService) {
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
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerActividades() {
    this.upload.obtenerRepasos(this.tituloCategoria)
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

  eliminarActividad(actividad) {
    this.upload.eliminarTodoRepaso(actividad);    
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl;
  }
}

  

