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

  async crearAsignacion (data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
            
    try {
      await this.db.collection('asignacionActividad').doc(nombreActividad).set({
        actividad: data.actividad,
        categoria: data.categoria,
        nivel: data.nivel
      });
            
    } catch (error) {
      console.log(error);
    }       
  }

  async agregarAlumnos (data: any, rut: string[], nombre: string[], imagen: string[]) {
    await this.crearAsignacion(data);
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      for (var i = 0; i < rut.length; i++) {
        console.log(rut[i])
        await this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).doc(rut[i]).set({
          rut: rut[i],
          nombreCompleto: nombre[i],
          imagen: imagen[i]
        });
     }
    } catch (error) {
      console.log(error);
    }
  }

  obtenerAlumnosAsignados (data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;

    try {
      return this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).valueChanges()
      // .ref.get()
      // .then(function (ququerySnapshotery) {
      //   ququerySnapshotery.forEach(function(doc){
      //     alumnos.push(doc.data());
      //   })
      // });

      // return alumnos;

    } catch (error) {
      console.log(error);
    }
  }

  obtenerRutAlumnosAsignados (data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;

    let alumnos: any[] = [];
    try {
      this.db.collection('asignacionActividad').doc(nombreActividad).collection(nombreActividad).ref.get()
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

  obtenerPrecargaUsuariosPorNivel(nivel: string) {
    let alumnos: any[] = [];
    try {
      this.db.collection('precargaUsuarios').ref.where("nivel","==",nivel).get()
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
    } catch (error) {
      console.log(error)
    }
  }
  

}
