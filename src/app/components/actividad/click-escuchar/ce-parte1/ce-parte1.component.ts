import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { bufferTime, map } from 'rxjs/operators';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VoiceService } from '../../../../services/voice.service';
import { UploadService } from '../../../../services/upload.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ce-parte1',
  templateUrl: './ce-parte1.component.html',
  styleUrls: ['./ce-parte1.component.scss'],
})
export class CeParte1Component implements OnInit {

  @Input() tituloActividad: string;
  @Input() tituloCategoria: string;
  
  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;
  seleccionRadioButton: boolean;
  actividad: any[] = [];
  posicionesElegidas: any[] = [];
  datos: Actividad [] = [];
  numero: number;
  tiempo_inicio: number;
  constructor(public upload: UploadService,
              public voice:  VoiceService,
              public fb: FormBuilder,
              public platform: Platform,
              ) {}

  ngOnInit() {
    
    this.obtenerDatosActividad();
    this.crearFormulario();
    let hora_inicio = this.obtenerTiempoInicio();
    localStorage.setItem("hora_inicio", hora_inicio);; 
    this.tiempo_inicio = window.performance.now(); 
  }

  obtenerTiempoInicio(){
    let d = new Date();
    let hora = d.getHours().toString();
    let minutos = d.getMinutes().toString();
    let segundos = d.getSeconds().toString();

    if(parseInt(hora) < 10) { hora = '0' + hora; }
    if(parseInt(minutos) < 10) { minutos = '0' + minutos; }
    if(parseInt(segundos) < 10) { segundos = '0' + segundos; }
    let hora_inicio = hora + ":" + minutos + ":" + segundos;
    return hora_inicio;
  }

  crearFormulario(){
    this.form = this.fb.group({
      checkbox0: [false, Validators.requiredTrue],
      checkbox1: [false, Validators.requiredTrue],
      checkbox2: [false, Validators.requiredTrue],
      checkbox3: [false, Validators.requiredTrue],
    });
  }

  obtenerDatosActividad() {
    this.upload.obtenerActividad(this.tituloActividad,this.tituloCategoria).pipe(
      map( (resp : Actividad[] ) => resp.map ( ({id, detalle}) => ({id, detalle})))
    )
    .subscribe( resp => {
      this.actividad = resp;
      setTimeout(() => {
        this.frutasAleatorias();
      }, 500);
    });
  }

  radioGroupChange(event) {
    this.seleccionRadioButton = event.detail.checked;
  }

  frutasAleatorias(){
    this.datos = [];
    
    var i,j,r,c;
    for (i = 0 ; i<4 ; i++){
      r = Math.floor(Math.random()*(this.actividad.length-this.posicionesElegidas.length))+1;
      c = 0;
      j = 0;
      do if (this.posicionesElegidas.indexOf(j++)==-1) c++; while(c<r);
      j--;
      this.datos.push(this.actividad[j]);
      this.posicionesElegidas.push(j);
    }
  }

  posicionItem(item) {
    this.numero = item;
  }

  hablarFrutas(texto: string) { 
    var plataforma = this.platform.platforms();
    if(this.seleccionRadioButton){
      this.voice.hablar(texto);
    }  
  }

  enviarDatos() {

    localStorage.setItem('datos', JSON.stringify(this.datos));
    this.onFormGroupChange.emit(this.form.value);

    let end = window.performance.now();
    let tiempo_total1 = (Math.round((end-this.tiempo_inicio)/1000));
    console.log(tiempo_total1);
    localStorage.setItem("tiempo_total", tiempo_total1.toString());
    
  }

}
