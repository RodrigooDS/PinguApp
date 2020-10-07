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


  estadistica = {
    buena: {
          nombre:[], 
           },
    parcial: {
          parciales: {
            nombre: [],
            erroneas: {}
          }
    },
    errores: 0
  }



  buena: number;
  mala: number;
  mala2: any [] = [];
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
    this.random = Math.floor(Math.random()*(this.imagenes.length));
    this.respuesta = this.imagenes[this.random];
    this.incorrectas.splice(0,this.incorrectas.length);

    console.log('buena', this.buena, 'Parcial', this.parcial, 'Malas', this.mala);
    // console.log( 'Nombre frutas buenas', this.estadistica.buena.nombre);
    // console.log('Frutas parciales', this.estadistica.parcial.parciales);
    // console.log('errores', this.estadistica.errores);
    console.log(this.estadistica);
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  enviarDatos() {
    console.log(this.mala2);
    if(this.respuesta === this.opcion){
      console.log('buena');
      this.imagenes.splice(this.random,1);
      if(this.respuesta === this.opcion && this.incorrectas.length == 0){
        this.buena++;
        this.estadistica.buena.nombre.push(this.datos[this.respuesta].detalle.nombreImagen);

      } else {
        this.parcial++;
        this.estadistica.parcial.parciales.erroneas =  (this.mala2);
        this.estadistica.parcial.parciales.nombre.push(this.datos[this.respuesta].detalle.nombreImagen);
        // this.mala2.slice(this.mala2.length);
        
      }
      this.seleccionarItem();
      
    }else{
      this.incorrectas.push(this.opcion);
      console.log('Incorrecta');
      this.mala++;

      this.estadistica.errores++;
      this.mala2.push(this.datos[this.opcion].detalle.nombreImagen);

    }
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.checked);
    this.seleccionRadioButton = event.detail.checked;
    console.log(this.seleccionRadioButton);
  }





}
