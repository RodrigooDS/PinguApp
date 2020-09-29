import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

//
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UploadService {


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
    console.log(this.nombreImagen);
    console.log('File', this.selectedFile);
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
      const imageUrl = await this.uploadFile(nombre, imagen);
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
      const imageUrl = await this.uploadFile(resp.id, imagen);
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
    return this.db.collection('repaso').doc(id).collection(actividad, ref => ref.where('categoria', '==', categoria).where('actividad', '==', actividad)).valueChanges();
  }

  obtenerActividades(categoria: string) {
    return this.db.collection('repaso', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerActividad(actividad : string) {
    console.log(actividad);
    return this.db.collection('repaso').doc(actividad).collection(actividad, 
      ref => ref.where('actividad', '==', actividad)).valueChanges();
  }

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

  async uploadFile(id,file): Promise<any> {
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
    console.log(item);
    try {
      if(item.image) {
        console.log(item.detalle.imageUrl);
        // this.storage.ref(`imagenes repaso'/${item.id}`).delete()
        await this.storage.storage.refFromURL(item.image).delete();
      }
      this.db.collection('repaso').doc(actividad).collection(actividad).doc(item.id).delete()
    } catch (error) {
      console.log(error);
    }
  }
  
}
