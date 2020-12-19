import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AsignacionActividadesService {

  constructor(public db: AngularFirestore, 
              public storage: AngularFireStorage,
              public loadingCtrl: LoadingController) { }

  async crearAsignacion (data: any, rut: string[], nombre: string[], imagen: string[]) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
            
    try {
      for (var i = 0; i < rut.length; i++) {
        await this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).doc(rut[i]).set({
          nombre: nombre[i],
          rut:rut[i],
          imagen: imagen[i]
        });  
      }

    } catch (error) {
      console.log(error);
    }       
  }

  async agregarAlumnos (data: any, rut: string[], nombre: string[], imagen: string[]) {

    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {

        await this.db.collection('asignacionActividad').doc(nombreActividad).set({
          actividad: data.actividad,
          categoria: data.categoria,
          contenidoActividad: data.interaccion,
          imagen: data.imagen,
          nivel: data.nivel,
          tipoActividad: data.tipoPregunta
        });

      this.crearAsignacion(data,rut,nombre,imagen);
      this.agregarAlumnosPorRut(data,rut,nombre,imagen);
    } catch (error) {
      console.log(error);
    }
  }

  async crearAsignacionActividad (data: any, rut: string[]) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
            
    try {
      for (var i = 0; i < rut.length; i++) {
        await this.db.collection('asignacionRutPorActividad').doc(rut[i]).collection("actividad").doc(nombreActividad).set({
          actividad: data.actividad,
          categoria: data.categoria,
          contenidoActividad: data.interaccion,
          imagen: data.imagen,
          nivel: data.nivel,
          tipoActividad: data.tipoPregunta
        });  
      }

    } catch (error) {
      console.log(error);
    }       
  }

  async agregarAlumnosPorRut (data: any, rut: string[], nombre: string[], imagen: string[]) {

    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      for (var i = 0; i < rut.length; i++) {
        await this.db.collection('asignacionRutPorActividad').doc(rut[i]).set({
          nombre: nombre[i],
          rut:rut[i],
          imagen: imagen[i]
        });
      }
      this.crearAsignacionActividad(data,rut);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerAlumnosAsignados (data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;

    try {
      return this.db.collection("asignacionActividad").doc(nombreActividad).collection(nombreActividad).valueChanges();

    } catch (error) {
      console.log(error);
    }
  }

  obtenerRutAlumnosAsignados (data: any, colegioData: any[]) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;

    let alumnos: any[] = [];
    try {
      this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).ref.where('idColegio','==',colegioData[0]).get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          alumnos.push(doc.data().rut);
        })
      });

      return alumnos;

    } catch (error) {
      console.log(error);
    }
  }

  async obtenerAlumnoAsignadoPorUid (uid: string) {
    let alumnos: any;
    try {
      await this.db.collection('precargaUsuarios').ref.where("uid","==",uid).get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          alumnos = (doc.data().rut);
        })
      });

      return alumnos;

    } catch (error) {
      console.log(error);
    }
  }

  async obtenerPrecargaUsuariosPorNivel(nivel: string,colegioData: any[]) {
    let alumnos: any[] = [];
    try {
      await this.db.collection('precargaUsuarios').ref.where("nivel","==",nivel).where('idColegio','==',colegioData[0]).get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          alumnos.push(doc.data());
        })
      });

      return alumnos;

    } catch (error) {
      console.log(error);
    }
  }

  async eliminarAlumnoAsignado (data: any, alumno: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      await this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).doc(alumno.rut).delete();
      await this.db.collection('asignacionRutPorActividad').doc(alumno.rut).collection("actividad").doc(nombreActividad).delete();
    } catch (error) {
      console.log(error)
    }
  }

  obtenerActividadesPorRut (rut:string, categoria: string) {
    console.log(rut,categoria)
    return this.db.collection("asignacionRutPorActividad").doc(rut).collection("actividad",ref=> ref.where("categoria","==",categoria)).valueChanges();
  }
  

}
