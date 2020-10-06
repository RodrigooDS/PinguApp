import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actividad } from '../../../../shared/actividad.interfaces';

@Component({
  selector: 'app-ce-parte2',
  templateUrl: './ce-parte2.component.html',
  styleUrls: ['./ce-parte2.component.scss'],
})
export class CeParte2Component implements OnInit {


  datos: Actividad [] = [];
  respuesta: number;
  opcion: number;
  seleccionRadioButton: any;

  constructor(public fb: FormBuilder) { 
    this.datos = JSON.parse(localStorage.getItem('datos'));
    this.seleccionarItem();
  }

  ngOnInit() {
    
  }

  seleccionarItem() {
    this.respuesta = Math.floor(Math.random()*(this.datos.length));
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  enviarDatos() {
    if(this.respuesta == this.opcion){
      console.log('buena');
    }else{
      this.seleccionarItem();
      console.log('esta mala crack');
    }
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.checked);
    this.seleccionRadioButton = event.detail.checked;
    console.log(this.seleccionRadioButton);
  }



}
