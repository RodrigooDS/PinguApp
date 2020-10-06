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

  incorrectas: number [] = [];
  imagenes: number [] = [0,1,2,3];
  random: number;



  buena: number;
  mala: number;
  parcial: number;

  opcion: number;
  seleccionRadioButton: any;

  constructor(public fb: FormBuilder, ) { 
    this.datos = JSON.parse(localStorage.getItem('datos'));
    this.seleccionarItem();
    this.buena = 0 , this.mala = 0, this.parcial = 0
    
  }

  ngOnInit() {
    
  }

  seleccionarItem() {
    
    // this.respuesta = Math.floor(Math.random()*(this.imagenes.length));
    this.random = Math.floor(Math.random()*(this.imagenes.length));
    this.respuesta = this.imagenes[this.random];
    this.incorrectas.splice(0,this.incorrectas.length);
    console.log(this.buena, this.parcial, this.mala);
    if(this.imagenes.length === 0){

    }
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  enviarDatos() {
    if(this.respuesta == this.opcion){
      console.log('buena');
      this.imagenes.splice(this.random,1);
      if(this.respuesta == this.opcion && this.incorrectas.length == 0){
        this.buena++;
      } else {
        this.parcial++;
      }
      this.seleccionarItem();
      
    }else{
      this.incorrectas.push(this.opcion);
      console.log('esta mala crack');
      this.mala= this.mala+1;
    }
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.checked);
    this.seleccionRadioButton = event.detail.checked;
    console.log(this.seleccionRadioButton);
  }





}
