import { Component, OnInit, Input } from '@angular/core';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-solo-texto',
  templateUrl: './solo-texto.component.html',
  styleUrls: ['./solo-texto.component.scss'],
})
export class SoloTextoComponent implements OnInit {

  @Input() tituloActividad: string;
  @Input() tituloCategoria: string;
  @Input() actividadContenido: string;


  seleccionRadioButton: boolean;

  actividad: any[] = [];
  pregunta: string;
  preguntas: any[] = [];

  respuestas:  any[] = [];
  answers: any[] = [];
  
  respuesta_correcta: any[]=[];

  opcion: number;                 //opción que marca el usuario.
  incorrectas: number [] = [];    

  constructor(public obtener_actividades: ObtenerActivadesService) { }

  ngOnInit() {
    this.obtenerPreguntas();
    this.obtenerRespuestas();
  }

  async obtenerDatosActividad(){
    this.actividad = await this.obtener_actividades.obtenerActividad(this.tituloActividad,this.tituloCategoria);
    return this.actividad;
  }

  async obtenerPreguntas() {

    this.actividad = await this.obtenerDatosActividad();
    this.preguntas = new Array(this.actividad.length);

    for(let i=0; i < this.preguntas.length; i++){
      this.preguntas[i] =  this.actividad[i].pregunta;
    }

  };

  async obtenerRespuestas(){

    let respuesta = await this.obtenerDatosActividad();

    for(let j = 0; j < this.preguntas.length; j++){
      for (let i = 0; i < 4; i++){
        this.respuestas.push(respuesta[j].respuestas[i]);
      }            
    }

    for(let i=0; i<this.preguntas.length;i++){

      this.respuesta_correcta.push(respuesta[i].correcta);

      if(i==0){
        this.answers[i] = (this.respuestas.slice(0 , 4));  
      }
      else{
        let x = 7;
        this.answers[i] = (this.respuestas.slice(i*(x-3), (x*i)+1));
      }
    }

   console.log(this.preguntas)
   console.log(this.answers);
   console.log(this.respuesta_correcta);

  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
    console.log(this.opcion)
  }

  enviarDatos(){
    if(this.respuesta_correcta[0] == this.opcion){
      console.log("Respuesta Correcta");
    } else {
      console.log("Respuesta Incorrecta");
      this.incorrectas.push(this.opcion);
    }
  };

}
