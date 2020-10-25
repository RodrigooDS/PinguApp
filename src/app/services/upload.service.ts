import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


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
      const fecha : string = Date.now().toString();
      const imageUrl = await this.uploadFile(fecha, imagen, 'imagenes actividad');
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
      const fecha : string = Date.now().toString();
      const imageUrl = await this.uploadFile(fecha, imagen, 'repaso');
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
      const imageUrl = await this.uploadFile(resp.id, imagen, 'repaso');
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
      this.alertLoading();
      if(item.id) {
        console.log(item.id);
        await this.storage.storage.refFromURL(item.imagen).delete();
        this.db.collection('repaso').doc(actividad).collection(actividad).doc(item.id).delete()
      }
      this.alertLoadingClose();
    } catch (error) {
      this.alertLoadingClose();
      console.log(error);
    }
  }
  async removerActividad(item,actividad: string) {
    
    try {
      this.alertLoading();
      if(item.id) {
        await this.storage.storage.refFromURL(item.imagen).delete();
        this.db.collection('actividad').doc(actividad).collection(actividad).doc(item.id).delete()
      }
      this.alertLoadingClose();
    } catch (error) {
      this.alertLoadingClose();
      console.log(error);
    }
  }

  async eliminarTodoRepaso(actividad) {
    try {
      this.alertLoading();
      this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad, 
          ref => ref.where('actividad', '==', actividad.actividad))
          .valueChanges()
          .subscribe( resp => {
            this.item = resp
          });
      await this.storage.storage.refFromURL(actividad.imagen.imageUrl).delete()
      for (var i = 0; i < this.item.length; i++){
        console.log(this.item[i].detalle.imageUrl);
        await this.storage.storage.refFromURL(this.item[i].detalle.imageUrl).delete()
        .then( async resp =>
          await this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad).doc(this.item[i].id).delete())
      }
      await this.db.collection('repaso').doc(actividad.actividad).delete();
      this.alertLoadingClose();
    } catch (error) {
      await this.db.collection('repaso').doc(actividad.actividad).delete();
      this.alertLoadingClose();
      console.log(error);
    }
  }

  async eliminarTodoActividad(actividad) {
    try {
      this.alertLoading();
      this.db.collection('actividad').doc(actividad.actividad).collection(actividad.actividad, 
          ref => ref.where('actividad', '==', actividad.actividad))
          .valueChanges()
          .subscribe( resp => {
            this.item = resp
          });
      await this.storage.storage.refFromURL(actividad.detalle.imageUrl).delete()
      for (var i = 0; i < this.item.length; i++){
        await this.storage.storage.refFromURL(this.item[i].detalle.imageUrl).delete()
        .then( async resp =>
          await this.db.collection('actividad').doc(actividad.actividad).collection(actividad.actividad).doc(this.item[i].id).delete())
      }
      await this.db.collection('actividad').doc(actividad.actividad).delete();
      this.alertLoadingClose();
    } catch (error) {
      await this.db.collection('actividad').doc(actividad.actividad).delete();
      this.alertLoadingClose();
      console.log(error);
    }
  }

  async alertLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor.',
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async alertLoadingClose() {

    this.loadingCtrl.dismiss();
    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
  
}
