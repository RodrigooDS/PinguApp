import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoCameraService } from '../../../services/photo-camera.service';

@Component({
  selector: 'app-cargar-repaso',
  templateUrl: './cargar-repaso.page.html',
  styleUrls: ['./cargar-repaso.page.scss'],
})
export class CargarRepasoPage implements OnInit {

  imageCamera: any;
  imagen : string;
  nombreImagen : string;
  json : any;
  file : any;
  data = [];

  selectedFile: any;
  tituloEspanol: string;
  tituloIngles: string;

  imageURL: string;

  constructor(public upload: UploadService, 
              public router: Router, 
              private route: ActivatedRoute,
              public photoService: PhotoCameraService) { }

  ngOnInit() {
    
  }

  agregarRepaso(){
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }
  
  subirArchivo(){
    var json = {  id               :'',
                  nombreEspanol    : this.tituloEspanol,
                  nombreIngles     : this.tituloIngles,
                  imagen           : this.imageURL,
                  // nombreImagen     : this.nombreImagen
    }
    localStorage.setItem('imagenes',JSON.stringify(json));  
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
  }
}
