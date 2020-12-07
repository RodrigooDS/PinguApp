import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividad } from '../../../shared/actividades.interfaces';

@Component({
  selector: 'app-contenido-solo-texto',
  templateUrl: './contenido-solo-texto.component.html',
  styleUrls: ['./contenido-solo-texto.component.scss'],
})
export class ContenidoSoloTextoComponent implements OnInit {

  form: FormGroup;
  selectedRadioGroup: any;
  respuestas = [];

  constructor(private fb: FormBuilder,
              public actividadService: ActividadesService) {
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

  async enviarDatos() {
    let dataActividad: Actividad;
    let contenido: {};
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))

    contenido = {
      correcta      : this.form.value.item,
      pregunta      : this.form.value.pregunta,
      respuestas    : [this.form.value.respuesta1, this.form.value.respuesta2, this.form.value.respuesta3, this.form.value.respuesta4]
    }

    this.actividadService.agregarActividadSoloTexto(contenido,dataActividad);
  }


}
