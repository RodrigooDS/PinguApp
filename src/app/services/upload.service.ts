import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

//
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  // items: Observable<any[]>;
  // newTodo: string = '';
  itemsRef: AngularFirestoreCollection;
  loading: HTMLIonLoadingElement;

  selectedFile: any;
  nombreImagen: string;
  
  constructor(private db: AngularFirestore, 
              private storage: AngularFireStorage, 
              private loadingController: LoadingController) {
    this.itemsRef = this.db.collection('repaso');
    // this.items = this.itemsRef.valueChanges();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
    this.nombreImagen = event.target.files[0].name;
    console.log(this.nombreImagen);
    console.log('File', this.selectedFile);
  }

  async crearActividad(categoria: string, actividad: string) {
    this.itemsRef.add({
      categoria: categoria,
      actividad: actividad,
      detalle:{
        imageUrl: ''
      }
      }).then( async resp =>{
        localStorage.setItem('id', resp.id);
        const imageUrl = await this.uploadFile(resp.id, this.selectedFile);
        this.itemsRef.doc(resp.id).update({
          id: resp.id,
          'detalle.imageUrl' : imageUrl || null
        }).catch(error =>{
          console.log(error);
        })
      });
  }
  
  async addTodo(tituloEspanol: string, tituloIngles: string, categoria: string, actividad: string, id: string) {
    this.db.collection('repaso').doc(id).collection(actividad).add({
      categoria: categoria,
      actividad: actividad,
      detalle: {
        nombreEspanol: tituloEspanol,
        nombreIngles: tituloIngles,
        imageUrl: ''
      }
    }).then( async resp =>{
      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)
      this.itemsRef.doc(id).collection(actividad).doc(resp.id).update({
        id: resp.id,
        'detalle.imageUrl' : imageUrl || null
      })
      }
      ).catch(error =>{
        console.log(error);
      })
  }
  
  obtenerImagenes(categoria: string, actividad: string, id: string) {
    // return this.db.collection('repaso', 
    //   ref => ref.where('categoria', '==', categoria).where('actividad', '==', actividad)).valueChanges();
    return this.db.collection('repaso').doc(id).collection(actividad, ref => ref.where('categoria', '==', categoria).where('actividad', '==', actividad)).valueChanges();
  }

  obtenerActividad(categoria: string) {
    return this.db.collection('repaso', 
      ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

  async uploadFile(id,file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('imagenes repaso').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`imagenes repaso/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando, espere por favor.'
    });
    return this.loading.present();
  }

  async remove(item,id: string,actividad: string) {
    try {
      if(item.detalle.imageUrl) {
        console.log(item.detalle.imageUrl);
        // this.storage.ref(`imagenes repaso'/${item.id}`).delete()
        await this.storage.storage.refFromURL(item.detalle.imageUrl).delete();
      }
      this.itemsRef.doc(id).collection(actividad).doc(item.id).delete()
    } catch (error) {
      console.log(error);
    }
    
  }
  
}
