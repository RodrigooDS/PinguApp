import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
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

  selectedFile: any;
  // tituloIngles: string;

  constructor(public upload: UploadService, 
              public router: Router, 
              private route: ActivatedRoute,
              public photoService: PhotoCameraService) { }

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

}
