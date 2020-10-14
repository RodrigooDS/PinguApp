import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VoiceService } from '../../../../services/voice.service';
import { UploadService } from '../../../../services/upload.service';
import { MenuController, Platform } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-ce-parte1',
  templateUrl: './ce-parte1.component.html',
  styleUrls: ['./ce-parte1.component.scss'],
})
export class CeParte1Component implements OnInit {

  @Input() tituloActividad: string;
  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;
  seleccionRadioButton: boolean;
  actividad: any[] = [];
  posicionesElegidas: any[] = [];
  datos: Actividad [] = [];
  numero: number;
  constructor(public upload: UploadService,
              public voice:  VoiceService,
              public fb: FormBuilder,
              public platform: Platform,
              ) { }

  ngOnInit() {
    
    this.obtenerDatosActividad();
    this.crearFormulario();
  }

  ionViewWillEnter(){
    
    this.obtenerDatosActividad();
    this.crearFormulario();
    console.log("Probando el ion");
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
    this.upload.obtenerActividad(this.tituloActividad).pipe(
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
    console.log("radioGroupChange",event.detail.checked);
    this.seleccionRadioButton = event.detail.checked;
    console.log(this.seleccionRadioButton);
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
    // console.log('plataforma',plataforma);
    if(this.seleccionRadioButton){
      // console.log(this.form.value)
      this.voice.hablar(texto);
    }  
  }

  enviarDatos() {
    // this.estado = false;
    // this.frutasAleatorias();
    localStorage.setItem('datos', JSON.stringify(this.datos));
    this.onFormGroupChange.emit(this.form.value);
    location.replace(('/tablinks/actividad/ce-completar'));
  
    // window.location.reload();
    // location.replace(('/tablinks/actividad/ce-completar'));
    // location.reload;
 
  }

}
