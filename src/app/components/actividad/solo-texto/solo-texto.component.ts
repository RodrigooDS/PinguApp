import { Component, OnInit, Input } from '@angular/core';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';
import { FinActividadPage } from '../../../pages/actividad/fin-actividad/fin-actividad.page';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { VoiceService } from '../../../services/voice.service';
import { EstadisticaService } from '../../../services/estadistica.service';
import { TabsService } from '../../../services/tabs.service';

@Component({
  selector: 'app-solo-texto',
  templateUrl: './solo-texto.component.html',
  styleUrls: ['./solo-texto.component.scss'],
})
export class SoloTextoComponent implements OnInit {

  @Input() tituloActividad: string;
  @Input() tituloCategoria: string;
  @Input() actividadContenido: string;
  @Input() tipoPregunta: string;
  @Input() imagen: string

  uid: string;
  radioBoolean : boolean[] = [];

  seleccionRadioButton: boolean;
  data: any[] = [];
  posicion: number = 0;
  respuestas : any[] = [];
  respuestasCorrecta : any[] = [];
  preguntas: any[] = [];
  opcion: number;                 
  incorrectas: number [] = [];    

  errores: number = 0;

  hora_inicio: any;
  inicio: number;

  estadistica = {
    contenido_actividad:"",
    fecha:"",
    hora_inicio:"",
    hora_termino:"",
    tiempo_total:"",
    buenas: {
            pregunta:[],
            respuesta: [], 
    },
    parcial: {
            parcialmente_correcto_pregunta: [],
            parcialmente_correcto_respuesta: [],
            erroneas:[{
              pregunta:[],
              respuesta:[]
            }]
    },
    errores: 0
  }

  constructor(public obtener_actividades: ObtenerActivadesService,
    private modalCtrl : ModalController,
    private auth: AuthService,
    public voice:  VoiceService,
    private estadisticaService: EstadisticaService,
    public tabEstado: TabsService
    ) {
      this.tabEstado.cambiarEstado(true);
    }

  async ngOnInit() {

    await this.obtenerUsuario();
    await this.obtenerDatosActividad();
    await this.obtenerRespuestas();
    await this.obteneRadioBoolean();

    this.hora_inicio = this.obtenerTiempo();
    this.inicio = window.performance.now();
  }

  //Se obtienen los valores de las actividades.
  async obtenerDatosActividad(){
    this.data = await this.obtener_actividades.obtenerActividad(this.tituloActividad,this.tituloCategoria);
  }

  obtenerRespuestas(){
    for(let i=0; i< this.data.length;i++){
        this.respuestas.push(this.data[i].respuestas);
        this.respuestasCorrecta.push(this.data[i].correcta);
        this.preguntas.push(this.data[i].pregunta);
    }
  }

  obteneRadioBoolean () {
    for(let i=0; i < 4;i++){
      this.radioBoolean[i] = false;
    }
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  async enviarDatos(){

    if(this.respuestasCorrecta[this.posicion] == this.opcion && this.incorrectas.length == 0){
  
      this.incorrectas.splice(0,this.incorrectas.length);   

      this.estadistica.buenas.pregunta.push(this.data[this.posicion].pregunta); 
      this.estadistica.buenas.respuesta.push(this.data[this.posicion].respuestas[this.data[this.posicion].correcta]);

      await this.obteneRadioBoolean();
      this.posicion++;

    } else if(this.respuestasCorrecta[this.posicion] == this.opcion ){
      
      this.estadistica.parcial.parcialmente_correcto_pregunta.push(this.data[this.posicion].pregunta);
      this.estadistica.parcial.parcialmente_correcto_respuesta.push(this.data[this.posicion].respuestas[this.data[this.posicion].correcta]);
      this.posicion++;
      this.incorrectas.splice(0,this.incorrectas.length);
      await this.obteneRadioBoolean();

    }else{
      
      // this.estadistica.parcial.erroneas.push(this.preguntas[this.posicion] + " - " + this.data[this.posicion].respuestas[this.opcion]);
      this.estadistica.parcial.erroneas.push( {pregunta: this.preguntas[this.posicion], respuesta: this.data[this.posicion].respuestas[this.opcion] });
      this.errores++;
      this.incorrectas.push(this.opcion);
      this.radioBoolean[this.opcion] = true;

    }
    if(this.posicion >= this.data.length){
      
      this.subirEstadisticas();
      this.abrirModal();
    }
  };

  subirEstadisticas(){

    this.estadistica.parcial.erroneas.shift();

    this.estadistica.contenido_actividad = this.actividadContenido;
    this.estadistica.fecha = this.obtenerFecha();

    this.estadistica.hora_termino = this.obtenerTiempo();
    this.estadistica.hora_inicio = this.hora_inicio;

    this.estadistica.errores = this.errores;

    let end = window.performance.now();
    let tiempo_total = (Math.round((end-this.inicio)/1000));
    this.estadistica.tiempo_total = tiempo_total.toString() + " Segundos";
    
    this.estadisticaService.guardarEstadistica(this.uid, this.tituloActividad, this.imagen, this.estadistica);
  }


  obtenerFecha(){

    var d = new Date();
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var yy = d.getFullYear();
   
      var myDateString = dd + "-" + mm + "-" + yy;
      return myDateString;

  }


  obtenerTiempo(){

    let d = new Date();
    let hora = d.getHours().toString();
    let minutos = d.getMinutes().toString();
    let segundos = d.getSeconds().toString();

    if(parseInt(hora) < 10) { hora = '0' + hora; }
    if(parseInt(minutos) < 10) { minutos = '0' + minutos; }
    if(parseInt(segundos) < 10) { segundos = '0' + segundos; }

    let hora_final = hora + ":" + minutos + ":" + segundos;
    return hora_final;

  }

  async obtenerUsuario(){
    let user = await this.auth.afAuth.currentUser
    this.uid = user.uid
    // this.auth.usuario.subscribe(resp => {
    //   this.auth.obtenerUsuario2(resp.uid).pipe(
    //     map( (resp: User) => resp)
    //   )
    //   .subscribe(
    //     resp => {
    //               this.uid = resp.uid;
    //             }
    //   );
    // })
  }

  hablarPregunta(texto: string) { 
    this.voice.hablar(texto);
  }
  
  hablarRespuesta(texto: string) { 
  this.voice.hablar(texto);
  }

  async abrirModal() {
    
    const modal = await this.modalCtrl.create({
      component: FinActividadPage,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      mode: "ios",
    });
      
    return await modal.present();
  }

}
