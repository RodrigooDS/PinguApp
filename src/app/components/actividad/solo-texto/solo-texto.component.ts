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
  data: any[] = [];
  posicion: number = 0;
  respuestas : any[] = [];
  respuestasCorrecta : any[] = [];
  preguntas: any[] = [];
  opcion: number;                 
  incorrectas: number [] = [];    

  constructor(public obtener_actividades: ObtenerActivadesService) { }

  async ngOnInit() {
    await this.obtenerDatosActividad();
    await this.obtenerRespuestas();
  }

  //Se obtienen los valores de las actividades.
  async obtenerDatosActividad(){
    this.data = await this.obtener_actividades.obtenerActividad(this.tituloActividad,this.tituloCategoria);
  }

  async obtenerRespuestas(){
    for(let i=0; i< this.data.length;i++){
        this.respuestas.push(this.data[i].respuestas);
        this.respuestasCorrecta.push(this.data[i].correcta);
        this.preguntas.push(this.data[i].pregunta);
    }
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  enviarDatos(){
    if(this.respuestasCorrecta[this.posicion] == this.opcion){
      // console.log("Respuesta Correcta");
      this.posicion++;
      console.log(this.posicion);
      // console.log(this.incorrectas);
      this.incorrectas.splice(0,this.incorrectas.length);
    } else {
      // console.log("Respuesta Incorrecta");
      this.incorrectas.push(this.opcion);
    }
  };

}
