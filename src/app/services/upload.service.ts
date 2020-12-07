import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// import { Actividad } from '../shared/actividad.interfaces';
import { Categoria } from '../shared/categoria.interfaces';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  // item : any[] = [];
  itemsRef: AngularFirestoreCollection;
  loading: HTMLIonLoadingElement;

  selectedFile: any;
  nombreImagen: string;
  
  constructor(private db: AngularFirestore, 
              private storage: AngularFireStorage,
              public loadingCtrl: LoadingController) {
    this.itemsRef = this.db.collection('repaso');
  }

  async crearActividad(categoria: string, actividad: string, imagen , nivel: string, interaccion: string) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    this.db.collection('actividad').doc(nombreActividad).set({
      categoria: categoria,
      actividad: actividad,
      interaccion: interaccion,
      nivel: nivel,
      detalle:{
        imageUrl: ''
      }
    })
    .then( async resp =>{
      let id = this.randomID(20);
      const imageUrl = await this.uploadFile(id, imagen, 'imagenes actividad');
      this.db.collection('actividad').doc(nombreActividad).update({
        'detalle.imageUrl' : imageUrl || null
      })
    })
    .catch(error =>{
        console.log(error);
    })
  }

  async agregarActividad(nombreImagen: string, fraseIngles: string, categoria: string, actividad: string, imagen: any) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+categoria;
    this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreImagen: nombreImagen,
        fraseIngles: fraseIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, imagen, 'imagenes actividad');
      this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(resp.id).update({
        id: resp.id,
        'detalle.imageUrl' : imageUrl || null
      })
    }).catch(error =>{
      console.log(error);
    })
  }

  async crearRepaso(categoria: string, actividad: string, imagen , nivel: string) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+categoria;
    this.db.collection('repaso').doc(nombreActividad).set({
      categoria: categoria,
      actividad: actividad,
      nivel: nivel,
      detalle:{
        imageUrl: ''
      }
    }).then( async resp =>{
      let id = this.randomID(20);
      const imageUrl = await this.uploadFile(id, imagen, 'imagenes repaso');
      this.itemsRef.doc(nombreActividad).update({
        'detalle.imageUrl' : imageUrl || null
      }).catch(error =>{
        console.log(error);
      })
    });
  }
  
  async agregarRepaso(tituloEspanol: string, tituloIngles: string, categoria: string, actividad: string, imagen: any) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    this.db.collection('repaso').doc(nombreActividad).collection(nombreActividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreEspanol: tituloEspanol,
        nombreIngles: tituloIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, imagen, 'imagenes repaso');
      this.itemsRef.doc(nombreActividad).collection(nombreActividad).doc(resp.id).update({
        id: resp.id,
        'detalle.imageUrl' : imageUrl || null
      })
    }).catch(error =>{
        console.log(error);
    })
  }
  
  obtenerImagenesRepaso(categoria: string, actividad: string, id: string) {
    return this.db.collection('repaso').doc(actividad).collection(actividad, 
      ref => ref.where('categoria', '==', categoria).where('actividad', '==', actividad)).valueChanges();
  }

  obtenerRepasos(categoria: string) {
    return this.db.collection('repaso', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerRepaso(actividad : string, categoria: string) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    return this.db.collection('repaso').doc(nombreActividad).collection(nombreActividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  obtenerActividades(categoria: string) {
    return this.db.collection('actividad', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerActividad(actividad : string, categoria: string) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    return this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  async obtenerExistenciaDeActividad(actividad : string, categoria: string) {
    let nombreActividad: string;
    let existenciaActividad : boolean;
    nombreActividad = actividad +" - "+ categoria;
    try {
      var docRef = await this.db.collection('actividad').doc(nombreActividad);
      await docRef.ref.get().then(function(doc) {
        if (doc.exists) {
          existenciaActividad = doc.exists;
        } else {
          existenciaActividad = false;
        }
      });

      return existenciaActividad;

    } catch (error) {
      console.log(error);
    }
  }

  async obtenerExistenciaDeRepaso(actividad : string, categoria: string) {
    let nombreActividad: string;
    let existenciaActividad : boolean;
    nombreActividad = actividad +" - "+ categoria;
    try {
      var docRef = await this.db.collection('repaso').doc(nombreActividad);
      await docRef.ref.get().then(function(doc) {
        if (doc.exists) {
          existenciaActividad = doc.exists;
        } else {
          existenciaActividad = false;
        }
      });

      return existenciaActividad;

    } catch (error) {
      console.log(error);
    }
  }

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

  async uploadFile(id,file, actividad: string): Promise<any> {
    if(file) {
      try {
        await this.storage.ref(actividad).child(id).put(file)
        return await this.storage.ref(`${actividad}/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async removerRepaso(item,actividad: string) {
    try {
      if(item.id) {
        console.log(item.id);
        await this.storage.storage.refFromURL(item.imagen).delete();
        await this.db.collection('repaso').doc(actividad).collection(actividad).doc(item.id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }
  async removerActividad(item, actividad: string, categoria: string) {
    let actividades : any[] = [];
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    try {
      if(item.id) {
        await this.storage.storage.refFromURL(item.imagen).delete();
        await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(item.id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarSubColleccionRepaso(nombreActividad: string, item: any, cantidadActividades: number){
    try {
      for (var i = 0; i < cantidadActividades; i++){
        await this.storage.storage.refFromURL(item[i].detalle.imageUrl).delete()
        await this.db.collection('repaso').doc(nombreActividad).collection(nombreActividad).doc(item[i].id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarColleccionRepaso(nombreActividad: string, actividad: any){
    try {
      await this.storage.storage.refFromURL(actividad.detalle.imageUrl).delete()
      await this.db.collection('repaso').doc(nombreActividad).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarTodoRepaso(actividad) {
    let nombreActividad: string;
    let cantidadActividades: number;
    let actividades : any[] = [];
    nombreActividad = actividad.actividad +" - "+ actividad.categoria;
    try {
      await this.db.collection('repaso').doc(nombreActividad).collection(nombreActividad).ref.get()
          .then(function(doc){
            cantidadActividades = doc.size;
          });
      await this.db.collection('repaso').doc(nombreActividad).collection(nombreActividad).ref.get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          actividades.push(doc.data());
        })
      });
      await this.eliminarSubColleccionRepaso(nombreActividad,actividades,cantidadActividades);
      await this.eliminarColleccionRepaso(nombreActividad,actividad);
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarSubColleccionActividad(nombreActividad: string, item: any, cantidadActividades: number){
    try {
      for (var i = 0; i < cantidadActividades; i++){
        await this.storage.storage.refFromURL(item[i].detalle.imageUrl).delete()
        await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(item[i].id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarColleccionActividad(nombreActividad: string, actividad: any){
    try {
      await this.storage.storage.refFromURL(actividad.detalle.imageUrl).delete()
      await this.db.collection('actividad').doc(nombreActividad).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarTodoActividad(actividad) {
    let nombreActividad: string;
    let cantidadActividades: number;
    let actividades : any[] = [];
    nombreActividad = actividad.actividad +" - "+ actividad.categoria;
    try {
      await this.db.collection('actiividad').doc(nombreActividad).collection(nombreActividad).ref.get()
          .then(function(doc){
            cantidadActividades = doc.size;
          });
      await this.db.collection('actiividad').doc(nombreActividad).collection(nombreActividad).ref.get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          actividades.push(doc.data());
        })
      });
      // await this.eliminarSubColleccionActividad(nombreActividad,actividades,cantidadActividades);
      // await this.eliminarColleccionActividad(nombreActividad,actividad);
      console.log(actividades);
    } catch (error) {
      console.log(error);
    }
  }

  async alertLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor.',
    });
    await loading.present();
  }

  async alertLoadingClose() {
    this.loadingCtrl.dismiss();
  }

  randomID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  
}
