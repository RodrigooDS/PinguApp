import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private db: AngularFirestore) { }

  obtenerPrecargaUsuariosFiltrados(tipoUsuario: string) {
    console.log(tipoUsuario);
    return this.db.collection('precargaUsuarios', ref => ref.where('tipoUsuario','==',tipoUsuario)).valueChanges();
  }

  obtenerEstadisticaPorActividad(uid: string) {
    console.log(uid);
    return this.db.collection('estadistica').doc(uid).collection(uid).valueChanges();
  }

  async guardarEstadistica (uid:string, actividad: string, estadistica: any) {
    await this.db.collection('estadistica').doc(uid).set({
      uid: uid
    });

    await this.db.collection('estadistica').doc(uid).collection(uid).doc(actividad).set({
      actividad: actividad
    })

    await this.db.collection('estadistica').doc(uid).collection(uid).doc(actividad).collection(actividad).add(estadistica)
  }
}
