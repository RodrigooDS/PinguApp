import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Repaso } from '../shared/repasos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RepasosService {

  constructor(public db: AngularFirestore, 
              public storage: AngularFireStorage,
              public loadingCtrl: LoadingController) { 
  }

  async crearRepaso(data: any) {
    let nombreRepaso: string;
    let fileImage: any;
    nombreRepaso = data.actividad +" - "+ data.categoria;
    try {
      await this.db.collection('repaso').doc(nombreRepaso).set({
        actividad: data.actividad,
        categoria: data.categoria,
        nivel: data.nivel,
        imagen: ""
      })
      fileImage = await this.dataURLtoFile(data.imagen,nombreRepaso);
      const imageUrl = await this.uploadFile(nombreRepaso, fileImage, 'imagenes repaso');
      await this.db.collection('repaso').doc(nombreRepaso).update({
        imagen : imageUrl
      });
    } catch (error) {
      console.log(error);
    }

  }

  async agregarRepaso(dataContent : any, data: Repaso) {

    let id = this.randomID(20);
    let nombreRepaso: string;
    let fileImage: any;
    let fileUrl: any;
    let resp: any;
    nombreRepaso = data.actividad +" - "+ data.categoria;

    resp = await this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).add({
      actividad         : data.actividad,
      categoria         : data.categoria,
      nombreEspanol     : dataContent.nombreEspanol,
      nombreIngles      : dataContent.nombreIngles,
      imagen            : "",
      id                : ""
    })

    id = await this.randomID(50);
    fileImage = await this.dataURLtoFile(dataContent.imagen,id);
    fileUrl = await this.uploadFile(id, fileImage, 'imagenes repaso');

    await this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).doc(resp.id).update({
      'id'      : resp.id,
      'imagen': fileUrl
    })

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

  obtenerRepasos() {
    return this.db.collection('repaso').valueChanges();
  }

  obtenerRepaso(actividad : string, categoria: string) {
    let nombreRepaso: string;
    nombreRepaso = actividad +" - "+ categoria;
    return this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).valueChanges();
  }

  async removerItem(data: any) {
    let nombreRepaso: string;
    nombreRepaso = data.actividad +" - "+ data.categoria;
    try {
      if(data.id) {
        await this.storage.storage.refFromURL(data.imagen).delete();
        await this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).doc(data.id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removerActividad(data: any) {
    let nombreRepaso: string;
    let actividades : any[] = [];
    nombreRepaso = data.actividad +" - "+ data.categoria;
    try {

      await this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).ref.get()
      .then(function (ququerySnapshotery) {
        ququerySnapshotery.forEach(function(doc){
          actividades.push(doc.data());
        })
      });
      await this.eliminarImagenesSubColeccion(actividades);
      await this.eliminarSubColeccionActividad(actividades);
      await this.eliminarColeccionActividad(data);
      
    } catch (error) {
      await this.eliminarColeccionActividad(data);
    }
  }

  // Se puede poner un if para ver si elimina o no
  async eliminarImagenesSubColeccion(data : any){
    try {
      if(data){
        console.log(data);
        for (var a = 0; a < data.length; a++){
          await this.storage.storage.refFromURL(data[a].imagen).delete();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarSubColeccionActividad(data: any) {
    let nombreRepaso: string;
    nombreRepaso = data[0].actividad +" - "+ data[0].categoria;
    try {
      for (var a = 0; a < data.length; a++){
        await this.db.collection('repaso').doc(nombreRepaso).collection(nombreRepaso).doc(data[a].id).delete()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async eliminarColeccionActividad(data: any){
    let nombreRepaso: string;
    nombreRepaso = data.actividad +" - "+ data.categoria;
    try {
      await this.storage.storage.refFromURL(data.imagen).delete()
      await this.db.collection('repaso').doc(nombreRepaso).delete();
    } catch (error) {
      console.log(error);
    }
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

  dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
  }

}
