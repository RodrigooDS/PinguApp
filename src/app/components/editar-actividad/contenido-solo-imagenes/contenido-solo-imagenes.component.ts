import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';
import { ActividadImagenes } from '../../../shared/actividadSoloImagenes.interfaces';

@Component({
  selector: 'app-contenido-solo-imagenes',
  templateUrl: './contenido-solo-imagenes.component.html',
  styleUrls: ['./contenido-solo-imagenes.component.scss'],
})
export class ContenidoSoloImagenesComponent implements OnInit {
  
  imageURL: string;
  imageCamera: any;
  imagenes = [];
  selectedRadioGroup: any;
  pregunta: string;
  

  constructor(public photoService: PhotoCameraService, 
              public actividadService: ActividadesService) { }

  ngOnInit() {
    
  }

  enviarDatos() {
    
  }

  async seleccionarImagen(pos: number){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
    this.imagenes[pos] = this.imageURL;
  }

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail;
  }

  async guardarDatos () {
    let dataActividad: ActividadImagenes;
    let contenido: {};
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))

    contenido = {
      correcta  : this.selectedRadioGroup.value,
      pregunta  : this.pregunta,
      imagen    : this.imagenes
    }
    
    await this.actividadService.agregarActividadSoloImagenes(contenido,dataActividad);

  }
}
