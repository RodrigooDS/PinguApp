import { Component, OnInit } from '@angular/core';
// import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoCameraService } from '../../../services/photo-camera.service';

@Component({
  selector: 'app-cargar-actividad',
  templateUrl: './cargar-actividad.page.html',
  styleUrls: ['./cargar-actividad.page.scss'],
})
export class CargarActividadPage implements OnInit {

  imageCamera: any;
  imagen : string;
  nombreImagen : string;
  fraseIngles: string;
  imageURL: string;
  json : any;
  file : any;
  data = [];

  tipoActividad: string;
  contenidoActividad: string;

  selectedFile: any;
  // tituloIngles: string;

  constructor(public router: Router,
              public photoService: PhotoCameraService) {
    this.obtenerLocalStorage()
  }

  ngOnInit() {
    
  }

  agregarRepaso(){
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }
  
  subirArchivo(){
    var json = {  id               : '',
                  nombreImagen     : this.nombreImagen,
                  fraseIngles      : this.fraseIngles,
                  imagen           : this.imageURL
    }
    localStorage.setItem('imagenes',JSON.stringify(json));  
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
  }


  obtenerLocalStorage() {
  this.json = JSON.parse(localStorage.getItem('actividad'))
  this.tipoActividad = this.json.tipoActividad;
  this.contenidoActividad = this.json.contenidoActividad;
  }

}
