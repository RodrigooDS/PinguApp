import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividad } from '../../../shared/actividades.interfaces';
import { LoadingController } from '@ionic/angular';

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
              public actividadService: ActividadesService,
              private location: Location,
              public loadingController: LoadingController) { }

  ngOnInit() {
    
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
    let dataActividad: Actividad;
    let contenido: {};
    await this.presentLoading();
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))
    
    contenido = {
      correcta  : this.selectedRadioGroup.value,
      pregunta  : this.pregunta,
      imagen    : this.imagenes
    }
    
    await this.actividadService.agregarActividadSoloImagenes(contenido,dataActividad);
    await this.loadingController.dismiss();
    this.location.back();   
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      mode: 'ios'
    });
    await loading.present();
  }
  
}
