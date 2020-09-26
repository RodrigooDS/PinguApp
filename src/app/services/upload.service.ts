import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  items: Observable<any[]>;

  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private loadingController: LoadingController) {
    this.itemsRef = this.db.collection('repaso');
    this.items = this.itemsRef.valueChanges();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
    console.log('File', this.selectedFile);
  }
  
  test(){
    this.itemsRef.doc('Comidas - Foods').collection('Frutas').add({
      color: 'amarillo',
      size: 25
    });
  }

  addTodo(tituloEspanol: string, tituloIngles: string){
    this.itemsRef.add({
      tituloEspanol: tituloEspanol,
      tituloIngles: tituloIngles
    })
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.itemsRef.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null
      })
      
    }).catch(error => {
      console.log(error);
    })
  }
  
  obtenerImagenes(){
    return this.items;
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('images').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }

  remove(item){
    console.log(item);
    if(item.imageUrl) {
      this.storage.ref(`images/${item.id}`).delete()
    }
    this.itemsRef.doc(item.id).delete()
  }
}
