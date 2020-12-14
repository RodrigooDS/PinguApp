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
}
