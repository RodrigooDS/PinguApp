import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividad } from '../../../shared/actividades.interfaces';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contenido-texto-imagen',
  templateUrl: './contenido-texto-imagen.component.html',
  styleUrls: ['./contenido-texto-imagen.component.scss'],
})
export class ContenidoTextoImagenComponent implements OnInit {

  form: FormGroup;
  selectedRadioGroup: any;
  respuestas = [];
    
  imageURL: string;
  imageCamera: any;
  imagenes = [];

  constructor(private fb: FormBuilder,
              public actividadService: ActividadesService,
              public loadingController: LoadingController,
              private location: Location,
              public photoService: PhotoCameraService) {
    this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario(){
    this.form = this.fb.group({
      pregunta                : ['', [Validators.required]],
      respuesta1              : ['', [Validators.required]],
      respuesta2              : ['', [Validators.required]],
      respuesta3              : ['', [Validators.required]],
      respuesta4              : ['', [Validators.required]],
      item                    : ['', [Validators.required]]
    });
  }

  async seleccionarImagen(pos: number){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
    this.imagenes[pos] = this.imageURL;
  }

  imagenesCargadas () {
    if(this.imagenes.length == 4) {
      return false
    } else {
      return true
    }
  }

  async guardarDatos() {

    let dataActividad: Actividad;
    let contenido: {};
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))
    await this.presentLoading();
    contenido = {
      correcta      : this.form.value.item,
      pregunta      : this.form.value.pregunta,
      respuestas    : [this.form.value.respuesta1, this.form.value.respuesta2, this.form.value.respuesta3, this.form.value.respuesta4],
      imagen        : this.imagenes
    }
    await this.loadingController.dismiss();
    this.actividadService.agregarActividadImagenesTexto(contenido,dataActividad);
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
