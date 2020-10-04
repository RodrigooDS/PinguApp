import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VoiceService } from '../../../../services/voice.service';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'app-ce-parte1',
  templateUrl: './ce-parte1.component.html',
  styleUrls: ['./ce-parte1.component.scss'],
})
export class CeParte1Component implements OnInit {

  @Input() tituloActividad: string;
  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;
  // estado: boolean = false;
  actividad: any[] = [];
  posicionesElegidas: any[] = [];
  datos: Actividad [] = [];
  numero: number;
  constructor(public upload: UploadService,
              public voice:  VoiceService,
              public fb: FormBuilder) { }

  ngOnInit() {
    this.obtenerDatosActividad();
    this.crearFormulario();
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

  hablar(texto: string) { 
    this.voice.hablar(texto);
  }

  enviarDatos() {
    // this.estado = false;
    // this.frutasAleatorias();
    localStorage.setItem('datos', JSON.stringify(this.datos));
    this.onFormGroupChange.emit(this.form.value);
    // this.datos
  }

}
