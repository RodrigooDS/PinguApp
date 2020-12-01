import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { ModalController } from '@ionic/angular';
import { CeEstadisticaPage } from '../../../../pages/actividad/click-escuchar/ce-estadistica/ce-estadistica.page';
import { User } from '../../../../shared/user.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../../services/upload.service';


@Component({
  selector: 'app-ce-parte2',
  templateUrl: './ce-parte2.component.html',
  styleUrls: ['./ce-parte2.component.scss'],
})

export class CeParte2Component implements OnInit {

  @Input() tiempo: string;

  datos: Actividad [] = [];
  respuesta: number;
  incorrectas: number [] = [];
  imagenes: number [] = [0,1,2,3];


  interaccion: string;
  uid: string;
  nombre: string;
  tituloActividad: string;

  random: number;

  estadistica = {
    fecha:"",
    tiempo_inicio:"",
    tiempo_termino:"",
    buena: {
          nombre:[], 
           },
    parcial: {
            parcialmente_correcto: [],
            erroneas:[]
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
              private modalCtrl : ModalController,
              private db: AngularFirestore,
              private auth: AuthService,
              private router: Router,
              public upload: UploadService, 
               ) { 
    this.datos = JSON.parse(localStorage.getItem('datos'));
    this.seleccionarItem();
    this.obtenerUsuario();
  }

  ngOnInit() {
    
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

  seleccionarItem() {
    this.random = Math.floor(Math.random()*(this.imagenes.length));
    this.respuesta = this.imagenes[this.random];
    this.incorrectas.splice(0,this.incorrectas.length);

    if(this.imagenes.length == 0){
      this.abrirModal();
      this.tituloActividad = localStorage.getItem('actividad');    

      this.estadistica.fecha = this.obtenerFecha();
      this.estadistica.tiempo_termino = this.obtenerTiempo();

      localStorage.setItem("Estadistica", JSON.stringify(this.estadistica));
      this.db.collection('Estadistica').doc('Estudiantes').collection(this.uid).doc("Click-Escuchar").collection(this.tituloActividad).add(this.estadistica);
    }
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
    let hora = d.getHours();
    let minutos = d.getMinutes();
    let segundos = d.getSeconds();
    let hora_final = hora + ":" + minutos + ":" + segundos;
    console.log(hora_final);
    return hora_final;
  }

  obtenerRespuetaCheckBox(i: number) {
    this.opcion = i;
  }

  enviarDatos() {

    if(this.respuesta === this.opcion){
      this.imagenes.splice(this.random,1);
      if(this.respuesta === this.opcion && this.incorrectas.length == 0){
        this.buena++;
        this.estadistica.buena.nombre.push(this.datos[this.respuesta].detalle.nombreImagen);

      } else {
        this.parcial++;
        this.estadistica.parcial.erroneas =  (this.mala2);
        this.estadistica.parcial.parcialmente_correcto.push(this.datos[this.respuesta].detalle.nombreImagen);        
      }
      this.seleccionarItem();
      
    }else{
      this.incorrectas.push(this.opcion);
      this.mala++;
      this.estadistica.errores++;
      this.mala2.push(this.datos[this.opcion].detalle.nombreImagen);

    }
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: CeEstadisticaPage,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      mode: "ios",
      componentProps: {
        buena: this.estadistica.buena.nombre,
        parcial: this.estadistica.parcial.parcialmente_correcto,
        error: this.estadistica.parcial.erroneas,
        errores: this.estadistica.errores     
      }
    });
      
    return await modal.present();
  }

}
