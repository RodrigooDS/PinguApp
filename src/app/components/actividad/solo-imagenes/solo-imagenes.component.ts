import { Component, OnInit, Input } from '@angular/core';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';
import { map } from 'rxjs/operators';
import { FinActividadPage } from '../../../pages/actividad/fin-actividad/fin-actividad.page';
import { ModalController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user.interface';
import { VoiceService } from '../../../services/voice.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-solo-imagenes',
  templateUrl: './solo-imagenes.component.html',
  styleUrls: ['./solo-imagenes.component.scss'],
})
export class SoloImagenesComponent implements OnInit {

  @Input() tituloActividad: string;
  @Input() tituloCategoria: string;
  @Input() actividadContenido: string;
  @Input() tipoPregunta: string;

  uid: string;
  

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
            erroneas:[]
    },
    errores: 0
  }


  constructor(public obtener_actividades: ObtenerActivadesService,
    private modalCtrl : ModalController,
    private db: AngularFirestore,
    private auth: AuthService,
    public voice:  VoiceService,
    public storage: AngularFireStorage
) { }

  async ngOnInit() {
    await this.obtenerUsuario();
    await this.obtenerDatosActividad();
    await this.obtenerRespuestas();

    this.hora_inicio = this.obtenerTiempo();
    this.inicio = window.performance.now();
    console.log(this.tipoPregunta);
  }

   //Se obtienen los valores de las actividades.
   async obtenerDatosActividad(){
    this.data = await this.obtener_actividades.obtenerActividad(this.tituloActividad,this.tituloCategoria);
  }

  async obtenerRespuestas(){
    for(let i=0; i< this.data.length;i++){
        this.respuestas.push(this.data[i].imagenes);
        this.respuestasCorrecta.push(this.data[i].correcta);
        this.preguntas.push(this.data[i].pregunta);
    }
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  async enviarDatos(){

    if(this.respuestasCorrecta[this.posicion] == this.opcion && this.incorrectas.length == 0){
  
      this.incorrectas.splice(0,this.incorrectas.length);   

      this.estadistica.buenas.pregunta.push(this.data[this.posicion].pregunta); 
      this.estadistica.buenas.respuesta.push(this.data[this.posicion].imagenes[this.data[this.posicion].correcta]); 

      this.posicion++;

    } else if(this.respuestasCorrecta[this.posicion] == this.opcion ){
      
      this.estadistica.parcial.parcialmente_correcto_pregunta.push(this.data[this.posicion].pregunta);
      this.estadistica.parcial.parcialmente_correcto_respuesta.push(this.data[this.posicion].imagenes[this.data[this.posicion].correcta]);
      this.posicion++;
      this.incorrectas.splice(0,this.incorrectas.length);

    }else{
      
      this.estadistica.parcial.erroneas.push(this.data[this.posicion].imagenes[this.opcion]);
      this.errores++;
      this.incorrectas.push(this.opcion);

    }
    if(this.posicion >= this.data.length){
      
      this.subirEstadisticas();
      this.abrirModal();
    }
  };

  subirEstadisticas(){

    this.estadistica.fecha = this.obtenerFecha();

    this.estadistica.hora_termino = this.obtenerTiempo();
    this.estadistica.hora_inicio = this.hora_inicio;

    this.estadistica.errores = this.errores;

    let end = window.performance.now();
    let tiempo_total = (Math.round((end-this.inicio)/1000));
    this.estadistica.tiempo_total = tiempo_total.toString() + " Segundos.";
    
    this.db.collection('estadistica').doc('Estudiantes').collection(this.uid).doc(this.actividadContenido).collection(this.tituloActividad).add(this.estadistica);
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

  obtenerUsuario(){
    this.auth.usuario.subscribe(resp => {
      this.auth.obtenerUsuario(resp.uid).pipe(
        map( (resp: User) => resp)
      )
      .subscribe(
        resp => {
                  this.uid = resp.uid;
                }
      );
    })
  }

  hablarPregunta(texto: string) { 
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
