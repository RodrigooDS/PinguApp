import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-accion',
  templateUrl: './modal-accion.page.html',
  styleUrls: ['./modal-accion.page.scss'],
})
export class ModalAccionPage implements OnInit {

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
 

  // constructor(private modalCtrl: ModalController,
  //             private camera: Camera,
  //             public actionSheetController: ActionSheetController,
  //             private file: File) {  }

  ngOnInit() {
  }

  // salirSinGuardar(){
  //   this.modalCtrl.dismiss();
  // }

  // guardar(){
  //   this.modalCtrl.dismiss({
  //   });
  // }


  // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }



  items: Observable<any[]>;

  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private loadingController: LoadingController) {
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  addTodo(){
    this.itemsRef.add({
      title: this.newTodo
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
