import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Actividad } from '../shared/actividades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(public db: AngularFirestore, 
              public storage: AngularFireStorage,
              public loadingCtrl: LoadingController) { }

  // Se crear la coleccion que contiene  las actividades
  async crearActividad(data: Actividad) {
    let nombreActividad: string;
    let fileImage: any;
    nombreActividad = data.actividad +" - "+ data.categoria;

    try {
      
      await this.db.collection('actividad').doc(nombreActividad).set({
        actividad: data.actividad,
        categoria: data.categoria,
        contenidoActividad: data.contenidoActividad,
        nivel: data.nivel,
        tipoActividad: data.tipoActividad,
        imagen: ""
      })

      fileImage = await this.dataURLtoFile(data.imagen,nombreActividad);
      const imageUrl = await this.uploadFile(nombreActividad, fileImage, 'imagenes actividad');
      await this.db.collection('actividad').doc(nombreActividad).update({
        imagen : imageUrl
      });

    } catch (error) {
      console.log(error);
    }

  }

  // Sirve para agregar actividad solo imagenes
  async agregarActividadSoloImagenes(dataContent : any, data: Actividad) {

    let id = this.randomID(20);
    let nombreActividad: string;
    let fileImage: any;
    let resp: any;
    let imageList = [];
    nombreActividad = data.actividad +" - "+ data.categoria;

    resp = await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).add({
      actividad : data.actividad,
      categoria : data.categoria,
      correcta  : dataContent.correcta,
      pregunta  : dataContent.pregunta,
      imagenes  : [] 
    })

    for (let i = 0; i < 4; i++){
      id = await this.randomID(50);
      fileImage = await this.dataURLtoFile(dataContent.imagen[i],id);
      imageList[i] = await this.uploadFile(id, fileImage, 'imagenes actividad');
    }

    await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(resp.id).update({
      'id'      : resp.id,
      'imagenes': imageList
    })

  }

  // Sirve para agregar actividad solo texto
  async agregarActividadSoloTexto (dataContent : any, data: Actividad) {

    let nombreActividad: string;
    let resp: any;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      resp = await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).add({
        actividad : data.actividad,
        categoria : data.categoria,
        correcta  : dataContent.correcta,
        pregunta  : dataContent.pregunta,
        respuestas  : dataContent.respuestas
      })

      await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(resp.id).update({
        'id'      : resp.id
      })

    } catch (error) {
      console.log(error);
    }
  }

  async agregarActividadImagenesTexto(dataContent : any, data: Actividad) {

    let id = this.randomID(20);
    let nombreActividad: string;
    let fileImage: any;
    let resp: any;
    let imageList = [];
    nombreActividad = data.actividad +" - "+ data.categoria;

    resp = await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).add({
      actividad : data.actividad,
      categoria : data.categoria,
      correcta  : dataContent.correcta,
      pregunta  : dataContent.pregunta,
      respuestas  : dataContent.respuestas,
      imagenes  : [] 
    })

    for (let i = 0; i < 4; i++){
      id = await this.randomID(50);
      fileImage = await this.dataURLtoFile(dataContent.imagen[i],id);
      imageList[i] = await this.uploadFile(id, fileImage, 'imagenes actividad');
    }

    await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(resp.id).update({
      'id'      : resp.id,
      'imagenes': imageList
    })

  }

  async obtenerActividades(categoria) {
    let actividades : any[] = [];
    await this.db.collection('actividad').ref.where('categoria', '==', categoria).get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        actividades.push(doc.data());
      })
    });
    
    return actividades;
  }

  obtenerActividad(actividad : string, categoria: string) {
    let nombreActividad: string;
    nombreActividad = actividad +" - "+ categoria;
    return this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).valueChanges();
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

  async removerItemSoloImagenes(data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      if(data.id) {
        for (let i = 0; i < data.imagenes.length; i++){
           await this.storage.storage.refFromURL(data.imagenes[i]).delete();
        }
        await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(data.id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removerItemSoloTexto(data: any) {
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      if(data.id) {
        await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(data.id).delete()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removerActividad(data: any) {
    let nombreActividad: string;
    let actividades : any[] = [];
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {

      await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).ref.get()
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
      if(data.imagenes){
        for (var a = 0; a < data.length; a++){
          for (var b = 0; b < data[a].imagenes.length; b++){
            await this.storage.storage.refFromURL(data[a].imagenes[b]).delete();
          }
        } 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarSubColeccionActividad(data: any) {
    let nombreActividad: string;
    nombreActividad = data[0].actividad +" - "+ data[0].categoria;
    try {
      for (var a = 0; a < data.length; a++){
        await this.db.collection('actividad').doc(nombreActividad).collection(nombreActividad).doc(data[a].id).delete()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async eliminarColeccionActividad(data: any){
    let nombreActividad: string;
    nombreActividad = data.actividad +" - "+ data.categoria;
    try {
      await this.storage.storage.refFromURL(data.imagen).delete()
      await this.db.collection('actividad').doc(nombreActividad).delete();
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

  obtenerCategorias() {
    return this.db.collection('categorias').valueChanges();
  }

}
