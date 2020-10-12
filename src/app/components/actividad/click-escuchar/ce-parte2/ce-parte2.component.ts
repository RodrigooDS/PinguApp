import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { ModalController } from '@ionic/angular';
import { CeEstadisticaPage } from '../../../../pages/actividad/click-escuchar/ce-estadistica/ce-estadistica.page';

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

  buena: number = 0;
  mala: number = 0;
  mala2: any [] = [];
  parcial: number = 0;

  opcion: number;
  seleccionRadioButton: any;

  constructor(public fb: FormBuilder, 
              private modalCtrl : ModalController ) { 
    this.datos = JSON.parse(localStorage.getItem('datos'));
    this.seleccionarItem();
  }

  ngOnInit() {
    
  }

  seleccionarItem() {
    this.random = Math.floor(Math.random()*(this.imagenes.length));
    this.respuesta = this.imagenes[this.random];
    this.incorrectas.splice(0,this.incorrectas.length);

    if(this.imagenes.length == 0){
      this.abrirModal();
    }
    // console.log('buena', this.buena, 'Parcial', this.parcial, 'Malas', this.mala);
    // console.log(this.imagenes);
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

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: CeEstadisticaPage,
      cssClass: 'my-custom-class',
      componentProps: {

        buena: this.estadistica.buena.nombre,
        parcial: this.estadistica.parcial.parciales.nombre,
        error: this.estadistica.parcial.parciales.erroneas,
        errores: this.estadistica.errores
        
      }
    });
      
    return await modal.present();
  }

}
