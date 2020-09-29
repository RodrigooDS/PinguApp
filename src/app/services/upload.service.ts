import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

//
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Actividad } from '../shared/actividad.interfaces';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  test : any[] = [];
  itemsRef: AngularFirestoreCollection;
  loading: HTMLIonLoadingElement;

  selectedFile: any;
  nombreImagen: string;
  
  constructor(private db: AngularFirestore, 
              private storage: AngularFireStorage) {
    this.itemsRef = this.db.collection('repaso');
  }

  chooseFile (event) {
    this.selectedFile = event.target.files[0];
    this.nombreImagen = event.target.files[0].name;
  }

  async crearActividad(categoria: string, actividad: string, imagen) {
    this.db.collection('repaso').doc(actividad).set({
      categoria: categoria,
      actividad: actividad,
      detalle:{
        imageUrl: ''
      }
    }).then( async resp =>{
      const nombre : string = Date.now().toString();
      const imageUrl = await this.uploadFile(nombre, imagen, actividad);
      this.itemsRef.doc(actividad).update({
      'detalle.imageUrl' : imageUrl || null
      }
      ).catch(error =>{
        console.log(error);
      })
    });
  }
  
  async agregarData(tituloEspanol: string, tituloIngles: string, categoria: string, actividad: string, imagen: any) {
    this.db.collection('repaso').doc(actividad).collection(actividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreEspanol: tituloEspanol,
        nombreIngles: tituloIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, imagen, actividad);
      this.itemsRef.doc(actividad).collection(actividad).doc(resp.id).update({
        id: resp.id,
        'detalle.imageUrl' : imageUrl || null
      })
      }
      ).catch(error =>{
        console.log(error);
      })
  }
  
  obtenerImagenes(categoria: string, actividad: string, id: string) {
    return this.db.collection('repaso').doc(actividad).collection(actividad, 
      ref => ref.where('categoria', '==', categoria).where('actividad', '==', actividad)).valueChanges();
  }

  obtenerActividades(categoria: string) {
    return this.db.collection('repaso', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerActividad(actividad : string) {
    return this.db.collection('repaso').doc(actividad).collection(actividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

  async uploadFile(id,file, actividad: string): Promise<any> {
    if(file) {
      try {
        const task = await this.storage.ref('imagenes repaso').child(id).put(file)
        return this.storage.ref(`imagenes repaso/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async remove(item,actividad: string) {
    
    try {
      if(item.id) {
        console.log(item.id);
        // this.storage.ref(`imagenes repaso'/${item.id}`).delete()
        await this.storage.storage.refFromURL(item.imagen).delete();
        this.db.collection('repaso').doc(actividad).collection(actividad).doc(item.id).delete()
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarTodo(actividad) {
    try {
      this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad, 
          ref => ref.where('actividad', '==', actividad.actividad))
          .valueChanges()
          .subscribe( resp => {
            this.test = resp
          });
      await this.storage.storage.refFromURL(actividad.imagen.imageUrl).delete()
      for (var i = 0; i < this.test.length; i++){
        console.log(this.test[i].detalle.imageUrl);
        await this.storage.storage.refFromURL(this.test[i].detalle.imageUrl).delete()
        .then( async resp =>
          await this.db.collection('repaso').doc(actividad.actividad).collection(actividad.actividad).doc(this.test[i].id).delete())
      }
      await this.db.collection('repaso').doc(actividad.actividad).delete();
    } catch (error) {
      console.log(error);
    }
  }
  
}
