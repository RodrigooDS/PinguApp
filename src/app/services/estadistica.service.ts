import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private db: AngularFirestore) { }

  obtenerPrecargaUsuariosFiltrados (tipoUsuario: string,colegioData: any[]) {
    return this.db.collection('precargaUsuarios', ref => ref.where('tipoUsuario','==',tipoUsuario).where('idColegio','==',colegioData[0])).valueChanges();
  }

  obtenerActividades (uid: string) {
    return this.db.collection('estadistica').doc(uid).collection(uid).valueChanges();
  }

  obtenerEstadisticaPorActividad (actividad: string, uid: string) {
    let estadistica : any[] = [];
    this.db.collection('estadistica').doc(uid).collection(uid).doc(actividad).collection(actividad).ref.get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        estadistica.push(doc.data());
      })
    });
    return estadistica;
  }

  async guardarEstadistica(uid:string, actividad: string, imagen:string,estadistica: any) {
    await this.db.collection('estadistica').doc(uid).set({
      uid: uid
    });

    await this.db.collection('estadistica').doc(uid).collection(uid).doc(actividad).set({
      actividad: actividad,
      imagen: imagen
    })

    await this.db.collection('estadistica').doc(uid).collection(uid).doc(actividad).collection(actividad).add(estadistica)
  }



}
