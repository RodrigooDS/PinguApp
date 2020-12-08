import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Actividad } from '../shared/actividades.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ObtenerActivadesService {

  constructor(public db: AngularFirestore, 
              public storage: AngularFireStorage) { }

  // Permite obtener todas las actividades por categoria           
  async obtenerActividades (categoria: string) {
    let actividades : any[] = [];
    await this.db.collection('actividad').ref.where('categoria', '==', categoria).get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        actividades.push(doc.data());
      })
    });
    
    return actividades;
  }

  async obtenerActividad (actividad: string , categoria: string) {
    let nombreActividad: string;
    let actividades : any[] = [];
    nombreActividad = actividad +" - "+ categoria;
    await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).ref.get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        actividades.push(doc.data());
      })
    });
    
    return actividades;
  }

}
