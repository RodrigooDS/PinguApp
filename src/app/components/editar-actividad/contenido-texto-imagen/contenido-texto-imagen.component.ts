import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';
import { ActividadImagenes } from '../../../shared/actividadSoloImagenes.interfaces';

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

  async enviarDatos() {

    let dataActividad: ActividadImagenes;
    let contenido: {};
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))

    contenido = {
      correcta      : this.form.value.item,
      pregunta      : this.form.value.pregunta,
      respuestas    : [this.form.value.respuesta1, this.form.value.respuesta2, this.form.value.respuesta3, this.form.value.respuesta4],
      imagen        : this.imagenes
    }

    console.log(contenido);

    this.actividadService.agregarActividadImagenesTexto(contenido,dataActividad);
  }

}
