import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Actividad } from '../shared/actividad.interfaces';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  item : any[] = [];
  itemsRef: AngularFirestoreCollection;
  loading: HTMLIonLoadingElement;

  selectedFile: any;
  nombreImagen: string;
  
  constructor(private db: AngularFirestore, 
              private storage: AngularFireStorage,
              public loadingCtrl: LoadingController) {
    this.itemsRef = this.db.collection('repaso');
  }

  chooseFile (event) {
    this.selectedFile = event.target.files[0];
    this.nombreImagen = event.target.files[0].name;
  }

  async crearActividad(categoria: string, actividad: string, imagen , nivel: string, interaccion: string) {
    this.db.collection('actividad').doc(actividad).set({
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
      this.db.collection('actividad').doc(actividad).update({
        'detalle.imageUrl' : imageUrl || null
      })
    })
    .catch(error =>{
        console.log(error);
    })
  }

  async agregarActividad(nombreImagen: string, fraseIngles: string, categoria: string, actividad: string, imagen: any) {
    this.db.collection('actividad').doc(actividad).collection(actividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreImagen: nombreImagen,
        fraseIngles: fraseIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, imagen, 'imagenes actividad');
      this.db.collection('actividad').doc(actividad).collection(actividad).doc(resp.id).update({
        id: resp.id,
        'detalle.imageUrl' : imageUrl || null
      })
    }).catch(error =>{
      console.log(error);
    })
  }

  async crearRepaso(categoria: string, actividad: string, imagen , nivel: string) {
    this.db.collection('repaso').doc(actividad).set({
      categoria: categoria,
      actividad: actividad,
      nivel: nivel,
      detalle:{
        imageUrl: ''
      }
    }).then( async resp =>{
      let id = this.randomID(20);
      const imageUrl = await this.uploadFile(id, imagen, 'imagenes repaso');
      this.itemsRef.doc(actividad).update({
        'detalle.imageUrl' : imageUrl || null
      }).catch(error =>{
        console.log(error);
      })
    });
  }
  
  async agregarRepaso(tituloEspanol: string, tituloIngles: string, categoria: string, actividad: string, imagen: any) {
    this.db.collection('repaso').doc(actividad).collection(actividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreEspanol: tituloEspanol,
        nombreIngles: tituloIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, imagen, 'imagenes repaso');
      this.itemsRef.doc(actividad).collection(actividad).doc(resp.id).update({
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

  obtenerRepaso(actividad : string) {
    return this.db.collection('repaso').doc(actividad).collection(actividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  obtenerActividades(categoria: string) {
    return this.db.collection('actividad', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerActividad(actividad : string) {
    return this.db.collection('actividad').doc(actividad).collection(actividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

  async uploadFile(id,file, actividad: string): Promise<any> {
    if(file) {
      try {
        const task = await this.storage.ref(actividad).child(id).put(file)
        return this.storage.ref(`${actividad}/${id}`).getDownloadURL().toPromise();
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
        this.db.collection('repaso').doc(actividad).collection(actividad).doc(item.id).delete()
      }
      
    } catch (error) {
      
      console.log(error);
    }
  }
  async removerActividad(item,actividad: string) {
    
    try {
      
      if(item.id) {
        await this.storage.storage.refFromURL(item.imagen).delete();
        this.db.collection('actividad').doc(actividad).collection(actividad).doc(item.id).delete()
      }
      
    } catch (error) {
      
      console.log(error);
    }
  }

  async eliminarSubColleccionRepaso(actividad: any, item: any){
    try {
      for (var i = 0; i < item.length; i++){
        await this.storage.storage.refFromURL(item[i].detalle.imageUrl).delete()
        .then( resp =>
          this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad).doc(item[i].id).delete())
      }
    } catch (error) {
      
    }
  }

  async eliminarColleccionRepaso(actividad: any){
    try {
      await this.storage.storage.refFromURL(actividad.detalle.imageUrl).delete()
      await this.db.collection('repaso').doc(actividad.actividad).delete();
    } catch (error) {
      
    }
  }
  async eliminarTodoRepaso(actividad) {
    try {
      this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad, 
          ref => ref.where('actividad', '==', actividad.actividad))
          .valueChanges()
          .subscribe( resp => {
            this.item = resp
            this.eliminarSubColleccionRepaso(actividad,this.item);
            this.eliminarColleccionRepaso(actividad);
          });
      
    } catch (error) {
      this.eliminarColleccionRepaso(actividad)
    }
  }

  async eliminarSubColleccionActividad(actividad: any, item: any){
    try {
      for (var i = 0; i < item.length; i++){
        await this.storage.storage.refFromURL(item[i].detalle.imageUrl).delete()
        .then( resp =>
          this.db.collection('actividad').doc(actividad.actividad).collection(actividad.actividad).doc(item[i].id).delete())
      }
    } catch (error) {
      
    }
  }

  async eliminarColleccionActividad(actividad: any){
    try {
      await this.storage.storage.refFromURL(actividad.detalle.imageUrl).delete()
      await this.db.collection('actividad').doc(actividad.actividad).delete();
    } catch (error) {
      
    }
  }

  async eliminarTodoActividad(actividad) {
    try {
      this.db.collection('actividad').doc(actividad.actividad).collection(actividad.actividad, 
          ref => ref.where('actividad', '==', actividad.actividad))
          .valueChanges()
          .subscribe( resp => {
            this.item = resp
            this.eliminarSubColleccionActividad(actividad,this.item);
            this.eliminarColleccionActividad(actividad);
          });
    } catch (error) {
      this.eliminarColleccionRepaso(actividad)
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
