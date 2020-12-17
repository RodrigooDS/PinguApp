import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

//firebase import
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// interfaces
import { Error } from '../shared/error.interfaces';
import { Categoria } from '../shared/categoria.interfaces';
import { User } from '../shared/user.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public usuario: Observable<User>;
  public error:   Observable<Error>;
  public categoria: Observable<Categoria>

  constructor(public afAuth: AngularFireAuth, 
              private db: AngularFirestore,
              private storage: AngularFireStorage,
              private alertController: AlertController,
              private router: Router) {
    this.usuario = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    
  }

  async login(email: string, password: string): Promise<User> {
    try{
      const {user}  = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }catch(error){
      this.errorMensaje(error);
    }
  }

  async register(email: string, password: string, form: any): Promise<User> {
    try {
      const {user}  = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.updateUserData(user,form);
      return user;
    } catch (error) {
      console.log('Error ->', error);
      this.errorMensaje(error);
    }
  }

  errorMensaje(error) {
    let tituloMensaje: string ="";
    let subMensaje:    string ="";

    const dataError: Error = {
      a: error.a,
      message: error.message,
      code: error.code
    }
    
    if(dataError.code == 'auth/user-not-found'){
      tituloMensaje = 'Correo electronico incorrecto';
      subMensaje    = 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.';
    }
    else if(dataError.code == 'auth/email-already-in-use'){
      tituloMensaje = 'Correo electronico incorrecto';
      subMensaje    = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.';
    }
    else{
      tituloMensaje = 'Contraseña incorrecta';
      subMensaje    = 'La contraseña no es válida o el usuario no tiene contraseña.';
    }
    this.alertaCuenta(tituloMensaje,subMensaje);
  }

  obtenerUsuario(uid: string){
    return this.db.collection('users').doc(uid).valueChanges();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async updateUserData(user: User, form: any) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const imageUrl = await this.getImageFromStorage("gato.png");
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: imageUrl
    };

    const resp = await this.db.collection("precargaUsuarios").doc(form.rut).update({
      'uid' : user.uid
    });
    
    return userRef.set(data, { merge: true });
  }


  async alertaCuenta(tituloMensaje: string, subMensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tituloMensaje,
      message: subMensaje,
      mode: 'ios',
      buttons: [
        {
          text: "Salir",
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  async upImageToStorage(id,file): Promise<any> {
    if(file) {
      try {
        const task = await this.storage.ref('UserImage').child(id).put(file)
        return this.storage.ref(`${'UserImage'}/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateImageUser(uid: string,imageUrl: string, id: string) {
    await this.db.collection('users').doc(uid).update({
      photoURL: imageUrl
    });
    await this.db.collection('precargaUsuarios').doc(id).update({
      'imagen' : imageUrl
    });
  }

  async getImageFromStorage(id){
    return this.storage.ref(`${"UserImage"}/${id}`).getDownloadURL().toPromise();
  } 

  // funciones para la precarga de estudiantes estos deben ir en un nuevo service
  async precargar(event: any, _nombreCompleto: string) {
    let resp = await this.db.collection('precargaUsuarios').doc(event.rut).set({
      nombre: event.nombre,
      apellidoPaterno: event.apellidoPaterno,
      apellidoMaterno: event.apellidoMaterno,
      rut: event.rut,
      fechaNacimiento: event.fechaNacimiento,
      nombreCompleto: _nombreCompleto,
      tipoUsuario: event.tipoUsuario,
      nivel: event.nivel,
      imagen: "",
      uid: ""
    });

    const imageUrl = await this.getImageFromStorage("gato.png");

    const res = await this.db.collection('precargaUsuarios').doc(event.rut).update({
      'imagen'  : imageUrl
    });
  }

  obtenerPrecargaUsuariosPorUsuario(tipoUsuario: string) {
    return this.db.collection('precargaUsuarios', ref => ref.where('tipoUsuario', '==', tipoUsuario)).valueChanges();
  }

  obtenerPrecargaUsuariosPorNivel(nivel: string) {
    return this.db.collection('precargaUsuarios', ref => ref.where('nivel', '==', nivel)).valueChanges();
  }

  async obtenerPrecargaUsuariosPorRut(rut: string) {
    let data: any;
    await this.db.collection('precargaUsuarios').doc(rut).ref.get()
    .then(function (doc) {
      if (doc.exists) {
        data =  doc.data();
      } else {
        data = null
      }
    }).catch(function(error) {
      console.log(error);
    });
    return data;
  }

  async obtenerPrecargaUsuriosPorUid(uid : string) {
    let id: string
    await this.db.collection('precargaUsuarios').ref.where("uid","==",uid).get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        id = doc.id;
      })
    });

    return id
  }

  obtenerTodosLosAlumnos() {
    return this.db.collection('users').valueChanges();
  }

  async obtenerTipoDeUsuario(uid : string) {
    let tipoUsuario: any
    await this.db.collection('precargaUsuarios').ref.where("uid","==",uid).get()
    .then(function (ququerySnapshotery) {
      ququerySnapshotery.forEach(function(doc){
        tipoUsuario = doc.data().tipoUsuario;
      })
    });
    return tipoUsuario;
  }

  // Este metodo elimina el usuario de todas las colecciones y del auth
  async eliminarTodoUsuario(usuario: any) {
    try {
      await this.eliminarUsuario(usuario.uid);
      await this.eliminarPreCargaUsuario(usuario.rut);
      await this.eliminarAuth(usuario.uid);
    } catch (error) {
      
    }
  }

  // Este metodo elimina el usuario de la coleccion precarga
  async eliminarPreCargaUsuario(rut: string) {
    try {
      this.db.collection('precargaUsuarios').doc(rut).delete();
    } catch (error) {
      
    }
  }

  // Este metodo elimina el usurio de la coleccion users
  async eliminarUsuario(uid: string) {
    try {
      this.db.collection('users').doc(uid).delete();
    } catch (error) {
      
    }
  }

  // Este metodo elimina del auth
  async eliminarAuth(uid: string) {
    try {
    //   var admin = require('firebase');
    //   admin.auth().deleteUser(uid)
    //   .then(function() {
    //     console.log("Successfully deleted user");
    //   })
    //   .catch(function(error) {
    //     console.log("Error deleting user:", error);
    //   }); 
    } catch (error) {
      console.log(error);
    }
  }

}