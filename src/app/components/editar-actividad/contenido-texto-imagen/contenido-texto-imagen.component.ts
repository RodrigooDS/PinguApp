import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';

@Component({
  selector: 'app-contenido-texto-imagen',
  templateUrl: './contenido-texto-imagen.component.html',
  styleUrls: ['./contenido-texto-imagen.component.scss'],
})
export class ContenidoTextoImagenComponent implements OnInit {

  imageURL: string;
  imageCamera: any;
  imagenes = [];
  selectedRadioGroup: any;
  

  constructor(public photoService: PhotoCameraService) { }

  ngOnInit() {}

  enviarDatos() {  }

  async seleccionarImagen(pos: number){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
    this.imagenes[pos] = this.imageURL;
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }

  test () {
    console.log(this.imagenes);
  }

}
